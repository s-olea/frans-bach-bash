import { useEffect, useState, useMemo } from "react";
import { database } from "../firebaseConfig";
import { ref, onValue, push, remove } from "firebase/database";
import { MEMBERS, CATEGORIES } from "../data";

function calculateBalances(expenses) {
  const paid = {};
  const owes = {};
  MEMBERS.forEach((m) => { paid[m] = 0; owes[m] = 0; });

  expenses.forEach((exp) => {
    const split = exp.splitAmong || MEMBERS;
    const share = exp.amount / split.length;
    paid[exp.payer] = (paid[exp.payer] || 0) + exp.amount;
    split.forEach((person) => {
      owes[person] = (owes[person] || 0) + share;
    });
  });

  const net = {};
  MEMBERS.forEach((m) => { net[m] = paid[m] - owes[m]; });
  return net;
}

function simplifyDebts(net) {
  const debtors = [];
  const creditors = [];
  Object.entries(net).forEach(([name, balance]) => {
    if (balance < -0.01) debtors.push({ name, amount: -balance });
    if (balance > 0.01) creditors.push({ name, amount: balance });
  });
  debtors.sort((a, b) => b.amount - a.amount);
  creditors.sort((a, b) => b.amount - a.amount);

  const settlements = [];
  let i = 0, j = 0;
  while (i < debtors.length && j < creditors.length) {
    const transfer = Math.min(debtors[i].amount, creditors[j].amount);
    if (transfer > 0.01) {
      settlements.push({
        from: debtors[i].name,
        to: creditors[j].name,
        amount: Math.round(transfer * 100) / 100,
      });
    }
    debtors[i].amount -= transfer;
    creditors[j].amount -= transfer;
    if (debtors[i].amount < 0.01) i++;
    if (creditors[j].amount < 0.01) j++;
  }
  return settlements;
}

function AddExpenseForm({ onAdd, members }) {
  const [payer, setPayer] = useState(members[0]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Dinner");
  const [splitAmong, setSplitAmong] = useState(new Set(members));
  const [open, setOpen] = useState(false);

  const toggleMember = (m) => {
    const next = new Set(splitAmong);
    if (next.has(m)) next.delete(m);
    else next.add(m);
    setSplitAmong(next);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim() || !amount || splitAmong.size === 0) return;
    onAdd({
      payer,
      description: description.trim(),
      amount: parseFloat(amount),
      category,
      splitAmong: [...splitAmong],
    });
    setDescription("");
    setAmount("");
    setSplitAmong(new Set(members));
    setOpen(false);
  };

  return (
    <div className="mb-4 sm:mb-6">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="w-full bg-neon/15 text-neon border border-neon/30 px-6 py-3.5 sm:py-3 rounded-xl font-semibold active:bg-gold/30 transition-all text-sm"
        >
          + Add Expense
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-3.5 sm:p-5 space-y-3 sm:space-y-4">
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            <div>
              <label className="block text-[11px] sm:text-xs text-text/50 mb-1">Payer</label>
              <select value={payer} onChange={(e) => setPayer(e.target.value)} className="w-full bg-bg border border-border rounded-lg px-3 py-2.5 sm:py-2 text-sm text-text focus:outline-none focus:border-gold/40">
                {members.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[11px] sm:text-xs text-text/50 mb-1">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-bg border border-border rounded-lg px-3 py-2.5 sm:py-2 text-sm text-text focus:outline-none focus:border-gold/40">
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-[11px] sm:text-xs text-text/50 mb-1">Description</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Smith & Wollensky Dinner" className="w-full bg-bg border border-border rounded-lg px-3 py-2.5 sm:py-2 text-sm text-text placeholder:text-text/30 focus:outline-none focus:border-gold/40" />
          </div>
          <div>
            <label className="block text-[11px] sm:text-xs text-text/50 mb-1">Amount (USD)</label>
            <input type="number" step="0.01" min="0" inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" className="w-full bg-bg border border-border rounded-lg px-3 py-2.5 sm:py-2 text-sm text-text placeholder:text-text/30 focus:outline-none focus:border-gold/40" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5 sm:mb-2">
              <label className="text-[11px] sm:text-xs text-text/50">Split among ({splitAmong.size})</label>
              <div className="flex gap-3">
                <button type="button" onClick={() => setSplitAmong(new Set(members))} className="text-[11px] text-neon/70 active:text-neon py-1">All</button>
                <button type="button" onClick={() => setSplitAmong(new Set())} className="text-[11px] text-text/40 active:text-text py-1">None</button>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {members.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => toggleMember(m)}
                  className={`px-2.5 py-1.5 sm:py-1 rounded-full text-xs font-medium transition-all ${
                    splitAmong.has(m)
                      ? "bg-neon/15 text-neon border border-neon/30"
                      : "text-text/30 bg-text/5 border border-transparent"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2 pt-1 sm:pt-2">
            <button type="submit" className="flex-1 sm:flex-none bg-neon text-bg font-semibold px-6 py-2.5 sm:py-2 rounded-lg active:bg-gold/90 transition-all">
              Save
            </button>
            <button type="button" onClick={() => setOpen(false)} className="flex-1 sm:flex-none text-text/50 px-4 py-2.5 sm:py-2 active:text-text transition-all">
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [syncing, setSyncing] = useState(true);
  const [mxnRate, setMxnRate] = useState(null);
  const [rateDate, setRateDate] = useState(null);
  const [showSettlements, setShowSettlements] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const expensesRef = ref(database, "expenses");
    const unsubscribe = onValue(expensesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.entries(data).map(([id, exp]) => ({ id, ...exp }));
        list.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
        setExpenses(list);
      } else {
        setExpenses([]);
      }
      setSyncing(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    fetch("https://api.frankfurter.app/latest?from=USD&to=MXN")
      .then((r) => r.json())
      .then((data) => {
        setMxnRate(data.rates.MXN);
        setRateDate(data.date);
      })
      .catch(() => {});
  }, []);

  const addExpense = async (exp) => {
    setSyncing(true);
    const expensesRef = ref(database, "expenses");
    await push(expensesRef, {
      ...exp,
      date: new Date().toISOString().split("T")[0],
      timestamp: Date.now(),
    });
  };

  const deleteExpense = async (id) => {
    if (deletingId === id) {
      await remove(ref(database, `expenses/${id}`));
      setDeletingId(null);
    } else {
      setDeletingId(id);
      setTimeout(() => setDeletingId(null), 3000);
    }
  };

  const net = useMemo(() => calculateBalances(expenses), [expenses]);
  const settlements = useMemo(() => simplifyDebts(net), [net]);
  const totalSpent = useMemo(() => expenses.reduce((s, e) => s + e.amount, 0), [expenses]);

  const copySettlements = () => {
    const lines = settlements.map(
      (s) => `${s.from} → ${s.to}: $${s.amount.toFixed(2)} USD${mxnRate ? ` ($${(s.amount * mxnRate).toFixed(2)} MXN)` : ""}`
    );
    navigator.clipboard.writeText(
      `Fran's Bach Bash — Settlement Summary\n${"-".repeat(40)}\n${lines.join("\n")}\n${"-".repeat(40)}\nTotal spent: $${totalSpent.toFixed(2)} USD`
    );
  };

  const fmt = (n) => `$${Math.abs(n).toFixed(2)}`;

  return (
    <section id="expenses" className="max-w-4xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <h2 className="font-display text-3xl sm:text-5xl text-neon text-center mb-1.5 sm:mb-2">
        Expenses
      </h2>
      <div className="text-center mb-4 sm:mb-6 space-y-1">
        <p className="text-text/50 text-xs sm:text-sm">
          Real-time sync — add an expense and everyone sees it instantly
          {syncing && <span className="ml-2 inline-block animate-spin text-gold">⟳</span>}
        </p>
        {mxnRate && (
          <p className="text-text/40 text-[11px] sm:text-xs">
            USD/MXN: {mxnRate.toFixed(2)} (as of {rateDate})
          </p>
        )}
      </div>

      <AddExpenseForm onAdd={addExpense} members={MEMBERS} />

      {expenses.length > 0 && (
        <div className="bg-card border border-border rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="flex items-center justify-between mb-2.5 sm:mb-3">
            <h3 className="text-text font-semibold text-xs sm:text-sm">
              Total: {fmt(totalSpent)} USD
              {mxnRate && <span className="text-text/40 ml-1 sm:ml-2 text-[11px] sm:text-sm">(${(totalSpent * mxnRate).toFixed(0)} MXN)</span>}
            </h3>
            <span className="text-text/40 text-[11px] sm:text-xs">{expenses.length} expense{expenses.length !== 1 ? "s" : ""}</span>
          </div>
          <div className="space-y-1.5 sm:space-y-2 max-h-72 sm:max-h-80 overflow-y-auto">
            {expenses.map((exp) => (
              <div key={exp.id} className="flex items-center gap-2.5 sm:gap-3 bg-bg/50 rounded-lg px-2.5 sm:px-3 py-2 group">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="text-text font-medium text-xs sm:text-sm truncate">{exp.description}</span>
                    <span className="text-[9px] sm:text-[10px] text-text/30 bg-text/5 px-1 sm:px-1.5 py-0.5 rounded shrink-0">{exp.category}</span>
                  </div>
                  <p className="text-text/40 text-[11px] sm:text-xs">
                    <span className="text-pink/80">{exp.payer}</span> · ÷{exp.splitAmong?.length || 16} · {exp.date}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-text font-mono font-semibold text-xs sm:text-sm">{fmt(exp.amount)}</p>
                  {mxnRate && <p className="text-text/30 text-[10px] sm:text-xs font-mono">${(exp.amount * mxnRate).toFixed(0)} MXN</p>}
                </div>
                <button
                  onClick={() => deleteExpense(exp.id)}
                  className={`text-xs px-2 py-1.5 rounded transition-all shrink-0 ${
                    deletingId === exp.id
                      ? "bg-red/20 text-red-400"
                      : "text-text/20 sm:opacity-0 sm:group-hover:opacity-100 active:text-red-400"
                  }`}
                >
                  {deletingId === exp.id ? "Confirm?" : "✕"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {expenses.length > 0 && (
        <div className="bg-card border border-border rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="flex items-center justify-between mb-2.5 sm:mb-3">
            <h3 className="text-text font-semibold text-xs sm:text-sm">Balances</h3>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 sm:gap-2">
            {MEMBERS.map((m) => (
              <div key={m} className="bg-bg/50 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-center">
                <p className="text-[11px] sm:text-xs text-text/60 truncate">{m}</p>
                <p className={`font-mono text-xs sm:text-sm font-semibold ${
                  net[m] > 0.01 ? "text-green-400" : net[m] < -0.01 ? "text-red-400" : "text-text/40"
                }`}>
                  {net[m] > 0.01 ? "+" : ""}{fmt(net[m])}
                </p>
                {mxnRate && (
                  <p className="text-text/30 text-[9px] sm:text-[10px] font-mono">
                    {net[m] > 0.01 ? "+" : net[m] < -0.01 ? "-" : ""}${(Math.abs(net[m]) * mxnRate).toFixed(0)} MXN
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {settlements.length > 0 && (
        <div className="bg-card border border-border rounded-xl p-3 sm:p-4">
          <div className="flex items-center justify-between mb-2.5 sm:mb-3">
            <button
              onClick={() => setShowSettlements(!showSettlements)}
              className="text-text font-semibold text-xs sm:text-sm flex items-center gap-2 py-1"
            >
              Settlements
              <span className={`text-xs transition-transform ${showSettlements ? "rotate-180" : ""}`}>▼</span>
            </button>
            <button
              onClick={copySettlements}
              className="text-[11px] sm:text-xs text-neon/70 active:text-neon transition-colors py-1 px-2"
            >
              Copy summary
            </button>
          </div>
          {showSettlements && (
            <div className="space-y-1.5 sm:space-y-2">
              {settlements.map((s, i) => (
                <div key={i} className="flex items-center gap-2 sm:gap-3 bg-bg/50 rounded-lg px-2.5 sm:px-3 py-2">
                  <span className="text-red-400 font-medium text-xs sm:text-sm">{s.from}</span>
                  <span className="text-text/30 text-xs">→</span>
                  <span className="text-green-400 font-medium text-xs sm:text-sm">{s.to}</span>
                  <span className="ml-auto font-mono text-xs sm:text-sm text-text font-semibold">{fmt(s.amount)}</span>
                  {mxnRate && <span className="text-text/30 text-[10px] sm:text-xs font-mono hidden sm:inline">${(s.amount * mxnRate).toFixed(2)} MXN</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {expenses.length === 0 && !syncing && (
        <div className="text-center py-10 sm:py-12 text-text/30">
          <p className="text-3xl sm:text-4xl mb-3">💸</p>
          <p className="text-sm">No expenses yet. Add the first one!</p>
        </div>
      )}
    </section>
  );
}
