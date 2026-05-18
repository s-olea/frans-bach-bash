export const MEMBERS = [
  "Fran", "Santi", "Ian", "Juan", "Moy", "Chuchu", "Cocos", "Edu",
  "Fico", "Genaro", "Andres", "Jero", "Fofo", "Anton", "JP", "Pi"
];

export const ROOMS = [
  { room: 1, guests: ["Edu"] },
  { room: 2, guests: ["Chuchu", "Cocos", "Genaro", "Juan"] },
  { room: 3, guests: ["Fico", "JP", "Ian", "Moy"] },
  { room: 4, guests: ["Andres", "Jero"] },
  { room: 5, guests: ["Santi", "Fran"] },
  { room: 6, guests: ["Fofo", "Anton", "Pi"] },
];

export const CATEGORIES = ["Golf", "Dinner", "Nightlife", "Hotel", "Transport", "Other"];

export const ITINERARY = [
  {
    day: "Friday",
    date: "May 22",
    color: "#00e5ff",
    events: [
      {
        time: "All day",
        emoji: "✈️",
        name: "Arrivals",
        venue: "Fontainebleau Las Vegas",
        address: "2777 S Las Vegas Blvd, Las Vegas, NV 89109",
        notes: "Everyone arrives and checks into Fontainebleau",
        who: "All 16",
        optional: false,
      },
      {
        time: "7:30 PM",
        emoji: "🥩",
        name: "Dinner — Smith & Wollensky",
        venue: "Smith & Wollensky",
        address: "3767 S Las Vegas Blvd, Las Vegas, NV 89109",
        notes: "Reservation under Ian. All 16. Classic steakhouse.",
        reservationHolder: "Ian",
        who: "All 16",
        optional: false,
      },
      {
        time: "~9:30 PM",
        emoji: "🍸",
        name: "Bars — Chandelier Bar",
        venue: "Chandelier Bar, The Cosmopolitan",
        address: "3708 S Las Vegas Blvd, Las Vegas, NV 89109",
        notes: "Plan: Chandelier Bar (The Cosmopolitan) or similar. Free flow / no reservation.",
        who: "All 16",
        optional: true,
      },
      {
        time: "~11 PM+",
        emoji: "🎰",
        name: "Casino",
        venue: "Fontainebleau Casino",
        address: "2777 S Las Vegas Blvd, Las Vegas, NV 89109",
        notes: "Fontainebleau casino or walk the strip. No hard plan.",
        who: "Whoever's down",
        optional: true,
      },
      {
        time: "Late night",
        emoji: "💃",
        name: "Gentlemen's Club",
        venue: "TBD",
        notes: "Optional — whoever wants to go. No specific venue locked.",
        who: "Optional",
        optional: true,
      },
    ],
  },
  {
    day: "Saturday",
    date: "May 23",
    color: "#ff2d9b",
    events: [
      {
        time: "10:30 AM",
        emoji: "⛳",
        name: "Golf Tournament — Desert Pines",
        venue: "Desert Pines Golf Club",
        address: "3415 E Bonanza Rd, Las Vegas, NV 89101",
        notes: "Reservation under Ian. 2-person team scramble. ~5 hrs. Teams: Fico+Jero+Moy · Genaro+JP · Santi+Andres · Fran+Chuchu · Juan+Ian. Non-golfers can rent a cart and tag along.",
        reservationHolder: "Ian",
        who: "Golfers (10)",
        optional: false,
      },
      {
        time: "~3:30 PM",
        emoji: "🏨",
        name: "Return to Hotel",
        venue: "Fontainebleau Las Vegas",
        address: "2777 S Las Vegas Blvd, Las Vegas, NV 89109",
        notes: "Rest, shower, get ready for the night.",
        who: "All",
        optional: false,
      },
      {
        time: "9:00 PM",
        emoji: "🍽️",
        name: "Dinner — Catch Las Vegas",
        venue: "Catch Las Vegas",
        address: "3500 S Las Vegas Blvd, Las Vegas, NV 89109",
        notes: "Reservation held but flexible — folks can dine elsewhere, go cheaper, or skip and go straight to casino.",
        who: "Open",
        optional: true,
      },
      {
        time: "10:30 PM",
        emoji: "🎉",
        name: "Omnia Nightclub — Steve Aoki",
        venue: "Omnia Nightclub, Caesars Palace",
        address: "3570 S Las Vegas Blvd, Las Vegas, NV 89109",
        notes: "Tickets under Juan. Main Room Balcony Large. DJ: Steve Aoki. Must arrive by 10:30.",
        reservationHolder: "Juan",
        who: "All 16",
        optional: false,
      },
      {
        time: "Post-club",
        emoji: "🎰",
        name: "Casino / After Party",
        venue: "Various",
        notes: "Optional post-party. No hard plan.",
        who: "Whoever's standing",
        optional: true,
      },
    ],
  },
  {
    day: "Sunday",
    date: "May 24",
    color: "#a855f7",
    events: [
      {
        time: "~1:00 PM",
        emoji: "🥂",
        name: "Brunch — Sadelle's",
        venue: "Sadelle's",
        address: "3600 S Las Vegas Blvd, Las Vegas, NV 89109",
        notes: "Soft invitation — open to whoever wants to join. ~1.5 hrs.",
        who: "Open",
        optional: true,
      },
      {
        time: "~2:30 PM",
        emoji: "🔫",
        name: "Battlefield Vegas Shooting Range",
        venue: "Battlefield Vegas",
        address: "2771 Industrial Rd, Las Vegas, NV 89109",
        notes: "Group activity post-brunch.",
        who: "Group",
        optional: false,
      },
      {
        time: "Afternoon+",
        emoji: "✈️",
        name: "Departures Begin",
        venue: null,
        notes: "Santi and others depart Sunday. Remaining group debates evening plans.",
        who: "Some depart",
        optional: false,
        departures: ["Santi"],
      },
      {
        time: "Evening (TBD)",
        emoji: "🏒",
        name: "NHL Game OR Cirque du Soleil",
        venue: "TBD",
        notes: "Open vote for remaining crew.",
        who: "Remaining crew",
        optional: true,
      },
    ],
  },
  {
    day: "Monday",
    date: "May 25",
    color: "#f0c040",
    events: [
      {
        time: "~1:30 PM",
        emoji: "✈️",
        name: "Final Departures",
        venue: null,
        notes: "Most remaining guests depart.",
        who: "Most depart",
        optional: false,
      },
      {
        time: "Evening",
        emoji: "🥩",
        name: "Cocos Solo — STK Steakhouse",
        venue: "STK Steakhouse",
        address: "3708 S Las Vegas Blvd, Las Vegas, NV 89109",
        notes: "Cocos solo dinner, then casino, then departs later that evening.",
        who: "Cocos",
        optional: false,
      },
    ],
  },
];

export const VENUES = [
  { name: "Fontainebleau Las Vegas", lat: 36.1368, lng: -115.1631, category: "Hotel", day: "all", address: "2777 S Las Vegas Blvd" },
  { name: "Smith & Wollensky", lat: 36.1215, lng: -115.1689, category: "Dinner", day: "Friday", address: "3767 S Las Vegas Blvd" },
  { name: "Chandelier Bar", lat: 36.1098, lng: -115.1743, category: "Bar", day: "Friday", address: "3708 S Las Vegas Blvd (Cosmopolitan)" },
  { name: "Desert Pines Golf Club", lat: 36.1785, lng: -115.1138, category: "Golf", day: "Saturday", address: "3415 E Bonanza Rd" },
  { name: "Catch Las Vegas", lat: 36.1168, lng: -115.1720, category: "Dinner", day: "Saturday", address: "3500 S Las Vegas Blvd (ARIA)" },
  { name: "Omnia Nightclub", lat: 36.1162, lng: -115.1745, category: "Nightlife", day: "Saturday", address: "3570 S Las Vegas Blvd (Caesars Palace)" },
  { name: "Sadelle's", lat: 36.1129, lng: -115.1765, category: "Brunch", day: "Sunday", address: "3600 S Las Vegas Blvd (Bellagio)" },
  { name: "Battlefield Vegas", lat: 36.1230, lng: -115.1580, category: "Activity", day: "Sunday", address: "2771 Industrial Rd" },
  { name: "STK Steakhouse", lat: 36.1098, lng: -115.1743, category: "Dinner", day: "Monday", address: "3708 S Las Vegas Blvd (Cosmopolitan)" },
];

export const RECOMMENDATIONS = [
  // ── Dinner: $$$$ (Splurge) ──
  { name: "Carbone", category: "Dinner", cost: 4, rating: 4.5, notes: "Italian-American classic at ARIA, reservation essential", link: "https://maps.google.com/?q=Carbone+Las+Vegas", lat: 36.1168, lng: -115.1720 },
  { name: "Nobu", category: "Dinner", cost: 4, rating: 4.4, notes: "Japanese omakase inside Caesars Palace", link: "https://maps.google.com/?q=Nobu+Las+Vegas+Caesars", lat: 36.1162, lng: -115.1745 },
  { name: "Bazaar Meat by José Andrés", category: "Dinner", cost: 4, rating: 4.6, notes: "Over-the-top meat temple at Sahara. Worth every dollar", link: "https://maps.google.com/?q=Bazaar+Meat+Las+Vegas", lat: 36.1412, lng: -115.1569 },
  { name: "Hell's Kitchen", category: "Dinner", cost: 4, rating: 4.3, notes: "Caesars Palace, Gordon Ramsay's flagship. Beef Wellington is a must", link: "https://maps.google.com/?q=Hells+Kitchen+Las+Vegas", lat: 36.1162, lng: -115.1745 },
  { name: "STK Steakhouse", category: "Dinner", cost: 4, rating: 4.2, notes: "Cosmopolitan, vibey steakhouse with DJ", link: "https://maps.google.com/?q=STK+Steakhouse+Las+Vegas", lat: 36.1098, lng: -115.1743 },
  { name: "Catch Las Vegas", category: "Dinner", cost: 4, rating: 4.3, notes: "Seafood & sushi at ARIA, great scene", link: "https://maps.google.com/?q=Catch+Las+Vegas", lat: 36.1168, lng: -115.1720 },

  // ── Dinner: $$$ (Nice but not insane) ──
  { name: "Beauty & Essex", category: "Dinner", cost: 3, rating: 4.3, notes: "Hidden behind a pawn shop at Cosmopolitan. Shareable plates, great vibe", link: "https://maps.google.com/?q=Beauty+Essex+Las+Vegas", lat: 36.1098, lng: -115.1743 },
  { name: "Mon Ami Gabi", category: "Dinner", cost: 3, rating: 4.4, notes: "French bistro with Strip-view patio at Paris", link: "https://maps.google.com/?q=Mon+Ami+Gabi+Las+Vegas", lat: 36.1125, lng: -115.1727 },
  { name: "Lavo Italian", category: "Dinner", cost: 3, rating: 4.1, notes: "Palazzo, huge portions, turns into a club late night", link: "https://maps.google.com/?q=Lavo+Italian+Las+Vegas", lat: 36.1224, lng: -115.1704 },
  { name: "Scotch 80 Prime", category: "Dinner", cost: 3, rating: 4.4, notes: "Palms steakhouse, off-strip gem. Great whisky selection", link: "https://maps.google.com/?q=Scotch+80+Prime+Las+Vegas", lat: 36.1163, lng: -115.1872 },
  { name: "Sake Rok", category: "Dinner", cost: 3, rating: 4.0, notes: "Park MGM, theatrical sushi spot with dancing staff", link: "https://maps.google.com/?q=Sake+Rok+Las+Vegas", lat: 36.1028, lng: -115.1760 },
  { name: "Nacho Daddy", category: "Dinner", cost: 3, rating: 4.2, notes: "Fun Mexican on the Strip with a scorpion shot challenge", link: "https://maps.google.com/?q=Nacho+Daddy+Las+Vegas+Strip", lat: 36.1140, lng: -115.1730 },

  // ── Dinner: $$ (Solid mid-range) ──
  { name: "Gordon Ramsay Fish & Chips", category: "Dinner", cost: 2, rating: 4.2, notes: "The LINQ, casual British comfort food", link: "https://maps.google.com/?q=Gordon+Ramsay+Fish+Chips+LINQ", lat: 36.1178, lng: -115.1712 },
  { name: "Secret Pizza", category: "Dinner", cost: 2, rating: 4.6, notes: "Hidden gem on 3rd floor of Cosmopolitan, no sign — look for the hallway", link: "https://maps.google.com/?q=Secret+Pizza+Cosmopolitan", lat: 36.1098, lng: -115.1743 },
  { name: "Eggslut", category: "Dinner", cost: 2, rating: 4.3, notes: "Cosmopolitan, epic egg sandwiches. Perfect hangover fuel", link: "https://maps.google.com/?q=Eggslut+Las+Vegas", lat: 36.1098, lng: -115.1743 },
  { name: "Bacchanal Buffet", category: "Dinner", cost: 2, rating: 4.4, notes: "Caesars Palace, best buffet in Vegas — endless variety", link: "https://maps.google.com/?q=Bacchanal+Buffet+Las+Vegas", lat: 36.1162, lng: -115.1745 },
  { name: "Tacos El Gordo", category: "Dinner", cost: 2, rating: 4.5, notes: "Authentic street tacos on the Strip, open late", link: "https://maps.google.com/?q=Tacos+El+Gordo+Las+Vegas+Strip", lat: 36.1260, lng: -115.1695 },
  { name: "Pin-Up Pizza", category: "Dinner", cost: 2, rating: 4.3, notes: "Planet Hollywood, giant slices, open till 3 AM", link: "https://maps.google.com/?q=Pin+Up+Pizza+Las+Vegas", lat: 36.1098, lng: -115.1727 },
  { name: "Sadelle's", category: "Dinner", cost: 2, rating: 4.3, notes: "Bellagio, killer brunch and smoked fish tower", link: "https://maps.google.com/?q=Sadelles+Bellagio+Las+Vegas", lat: 36.1129, lng: -115.1765 },

  // ── Dinner: $ (Cheap eats) ──
  { name: "In-N-Out Burger", category: "Dinner", cost: 1, rating: 4.3, notes: "Strip-adjacent location, iconic post-night-out move", link: "https://maps.google.com/?q=In-N-Out+Burger+Las+Vegas+Strip", lat: 36.1203, lng: -115.1690 },
  { name: "White Castle", category: "Dinner", cost: 1, rating: 3.8, notes: "Casino Royale on the Strip, 24/7 sliders", link: "https://maps.google.com/?q=White+Castle+Las+Vegas+Strip", lat: 36.1199, lng: -115.1721 },
  { name: "Raising Cane's", category: "Dinner", cost: 1, rating: 4.4, notes: "Best chicken fingers, right on the Strip at the LINQ", link: "https://maps.google.com/?q=Raising+Canes+Las+Vegas+Strip", lat: 36.1178, lng: -115.1712 },
  { name: "Shake Shack", category: "Dinner", cost: 1, rating: 4.2, notes: "New York-New York, solid burgers and shakes", link: "https://maps.google.com/?q=Shake+Shack+Las+Vegas+Strip", lat: 36.1022, lng: -115.1747 },

  // ── Bar & Club ──
  { name: "Drai's Beachclub & Nightclub", category: "Bar & Club", cost: 4, rating: 4.1, notes: "Rooftop at Cromwell, live hip-hop acts, incredible views", link: "https://maps.google.com/?q=Drais+Las+Vegas", lat: 36.1186, lng: -115.1708 },
  { name: "Marquee Nightclub", category: "Bar & Club", cost: 3, rating: 4.0, notes: "The Cosmopolitan, top-tier EDM DJs", link: "https://maps.google.com/?q=Marquee+Nightclub+Las+Vegas", lat: 36.1098, lng: -115.1743 },
  { name: "XS Nightclub", category: "Bar & Club", cost: 4, rating: 4.3, notes: "Wynn, legendary pool-club hybrid. Best production in Vegas", link: "https://maps.google.com/?q=XS+Nightclub+Las+Vegas", lat: 36.1291, lng: -115.1653 },
  { name: "Hakkasan", category: "Bar & Club", cost: 4, rating: 4.1, notes: "MGM Grand, five levels of club and restaurant", link: "https://maps.google.com/?q=Hakkasan+Las+Vegas", lat: 36.1023, lng: -115.1703 },
  { name: "LIV at Fontainebleau", category: "Bar & Club", cost: 4, rating: 4.2, notes: "Your hotel's own mega-club. No Uber needed", link: "https://maps.google.com/?q=LIV+Fontainebleau+Las+Vegas", lat: 36.1368, lng: -115.1631 },
  { name: "Zouk Nightclub", category: "Bar & Club", cost: 3, rating: 4.0, notes: "Resorts World, newer club with wild LED ceiling", link: "https://maps.google.com/?q=Zouk+Nightclub+Las+Vegas", lat: 36.1370, lng: -115.1647 },
  { name: "The Vesper Bar", category: "Bar & Club", cost: 2, rating: 4.3, notes: "Cosmopolitan, intimate craft cocktails, perfect pre-game spot", link: "https://maps.google.com/?q=Vesper+Bar+Cosmopolitan", lat: 36.1098, lng: -115.1743 },
  { name: "Atomic Liquors", category: "Bar & Club", cost: 2, rating: 4.4, notes: "Oldest freestanding bar in LV, downtown Fremont area", link: "https://maps.google.com/?q=Atomic+Liquors+Las+Vegas", lat: 36.1690, lng: -115.1390 },
  { name: "Skyfall Lounge", category: "Bar & Club", cost: 3, rating: 4.5, notes: "64th floor of Delano, jaw-dropping panoramic views of the Strip", link: "https://maps.google.com/?q=Skyfall+Lounge+Las+Vegas", lat: 36.0937, lng: -115.1764 },
  { name: "Vanderpump Cocktail Garden", category: "Bar & Club", cost: 2, rating: 4.1, notes: "Paris Las Vegas, floral and bougie, great for photos", link: "https://maps.google.com/?q=Vanderpump+Cocktail+Garden+Las+Vegas", lat: 36.1125, lng: -115.1727 },
  { name: "Electra Cocktail Club", category: "Bar & Club", cost: 2, rating: 4.2, notes: "Palazzo, neon-lit speakeasy with live DJs and no cover", link: "https://maps.google.com/?q=Electra+Cocktail+Club+Las+Vegas", lat: 36.1224, lng: -115.1704 },
  { name: "Herbs & Rye", category: "Bar & Club", cost: 2, rating: 4.5, notes: "Off-strip speakeasy, half-price happy hour steaks + top cocktails", link: "https://maps.google.com/?q=Herbs+and+Rye+Las+Vegas", lat: 36.1540, lng: -115.1630 },

  // ── Gentlemen's Club ──
  { name: "Sapphire Las Vegas", category: "Gentlemen's Club", cost: 3, rating: 4.0, notes: "Largest in the world, off-strip. Free limo pickup available", link: "https://maps.google.com/?q=Sapphire+Las+Vegas", lat: 36.1385, lng: -115.1680 },
  { name: "Hustler Club", category: "Gentlemen's Club", cost: 3, rating: 3.8, notes: "Mid-strip area, rooftop with views", link: "https://maps.google.com/?q=Larry+Flynt+Hustler+Club+Las+Vegas", lat: 36.1130, lng: -115.1780 },
  { name: "Spearmint Rhino", category: "Gentlemen's Club", cost: 3, rating: 4.1, notes: "Vegas institution, off-strip near Convention Center", link: "https://maps.google.com/?q=Spearmint+Rhino+Las+Vegas", lat: 36.1340, lng: -115.1540 },
  { name: "Crazy Horse III", category: "Gentlemen's Club", cost: 2, rating: 3.9, notes: "Good value option, free entry deals often available online", link: "https://maps.google.com/?q=Crazy+Horse+3+Las+Vegas", lat: 36.1088, lng: -115.1810 },
];

export const DAY_COLORS = {
  Friday: "#00e5ff",
  Saturday: "#ff2d9b",
  Sunday: "#a855f7",
  Monday: "#f0c040",
  all: "#a855f7",
  Recommendation: "#00e5ff",
};
