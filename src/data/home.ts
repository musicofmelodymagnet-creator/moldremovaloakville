// FINAL HOMEPAGE COPY — перенесён дословно из «Финальный текст для сайта».
// Не переписывать и не сокращать: SEO-фразы распределены по H1/H2/H3 намеренно.
// Убраны только хвосты-подписи источников («Канада», «Halton», «Оквилл»), случайно вставшие в текст.
import type { ServiceKey } from './site';
import type { ImageMetadata } from 'astro';
import heroMain from '../assets/hero/mold-removal-oakville-technician-treatment.jpg';
// Фото — чистые версии от владельца (2026-10-02) из Photos/Photos for site; исходники подготовлены в JPEG q92 4:4:4, AVIF/WebP делает Astro.
import pInspection from '../assets/photos/mold-inspection-oakville-moisture-meter.jpg';
import pTesting from '../assets/photos/mold-testing-oakville-culture-plate.jpg';
import pAttic from '../assets/photos/attic-mold-removal-oakville-roof-sheathing.jpg';
import pBasement from '../assets/photos/basement-mold-removal-oakville-damp-basement.jpg';
import pBlack from '../assets/photos/black-mold-removal-oakville-room-corner.jpg';
import pBathroom from '../assets/photos/bathroom-mold-removal-oakville-tile-grout.jpg';
import pCrawl from '../assets/photos/crawl-space-mold-removal-oakville-inspection.jpg';
import pCommercial from '../assets/photos/commercial-mold-remediation-oakville-treatment.jpg';
import pWater from '../assets/photos/water-damage-mold-remediation-ceiling.jpg';
import pEmergency from '../assets/photos/emergency-mold-removal-oakville-water-damage.jpg';
import pVerification from '../assets/photos/post-remediation-verification-treated-room.jpg';
import tBasement from '../assets/photos/finished-basement-mold-after-water-intrusion.jpg';
import tAttic from '../assets/photos/attic-mold-condensation-roof-sheathing.jpg';
import tBathroom from '../assets/photos/bathroom-ceiling-mold-trim.jpg';
import tWall from '../assets/photos/mold-behind-finished-wall-wallpaper.jpg';
import tCommercial from '../assets/photos/commercial-water-loss-mold-treatment.jpg';
import basementStairs from '../assets/photos/oakville-basement-water-intrusion.jpg';
import moldColonies from '../assets/photos/mold-colonies-petri-dish-macro.jpg';
import moldPetri from '../assets/photos/mold-culture-petri-dish-sample.jpg';
import heroSpray from '../assets/hero/mold-remediation-technician-spraying-wall.jpg';
import heroCorner from '../assets/hero/black-mold-wall-corner-window.jpg';
import heroBaseboard from '../assets/hero/mold-removal-technician-spraying-baseboard.jpg';
// Эмблемы под фото hero (вырезаны из общего макета владельца, белый фон — ставить на белую карточку)
import eScope from '../assets/emblems/written-scope-before-work.png';
import eMoisture from '../assets/emblems/moisture-source-checked.png';
import eHepa from '../assets/emblems/hepa-controlled-work-areas.png';
import ePhoto from '../assets/emblems/photo-documentation.png';
import eTargeted from '../assets/emblems/targeted-removal.png';
import eVerification from '../assets/emblems/independent-verification-available.png';

export const meta = {
  title: 'Mold Removal Oakville | Mold Remediation & Inspection',
  description:
    'Mold removal in Oakville for homes and businesses. Mold inspection, mould remediation, attic, basement and black mold services. Get a clear estimate.',
};

export const nav = [
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export const cta = { estimate: 'Get Free Estimate', submit: 'Get Free Estimate', callNote: 'Speak with\nan expert' };

export const hero = {
  h1: 'Mold Removal Oakville',
  badge: '24/7 · Same-Day Response · Licensed & Insured',
  lead: 'Mold does not always stop where the stain stops.',
  // Фразы поверх фото hero (вместе с lead): меняются одновременно со слайдом, в случайном порядке
  rotating: [
    'The stain may be small. The moisture problem may not be.',
    'A clean-looking wall does not prove the problem is gone.',
    'If moisture remains, mold can return.',
    'A musty smell after cleanup deserves a closer look.',
    'Removing more material will not fix the source of moisture.',
  ],
  paragraphs: [
    'We provide mold removal and mould remediation in Oakville for homes, rental properties and commercial spaces. That includes attic mold, damp basements, bathrooms, wall cavities, water-damaged rooms and situations where the same problem keeps coming back after cleaning.',
    'Before recommending removal, we look at what matters first: where the moisture came from, how far it travelled and which materials are actually affected. That gives you a clearer scope — and helps avoid paying for work that does not solve the cause.',
  ],
  tagline: 'Know the scope before the demolition starts.',
  // Эмблемы: title = текст на самой эмблеме (идёт в alt), text — уточнение под эмблемой
  trust: [
    { image: eScope, title: 'Written Scope Before Work', text: 'Know what is included before demolition starts.' },
    { image: eMoisture, title: 'Moisture Source Checked', text: 'We look for the water problem behind the mold.' },
    { image: eHepa, title: 'HEPA-Controlled Work Areas', text: 'Work zones are controlled during material disturbance.' },
    { image: ePhoto, title: 'Photo Documentation', text: 'Clear records before, during and after the work.' },
    { image: eTargeted, title: 'Targeted Removal', text: 'Remove affected materials without automatic over-demolition.' },
    { image: eVerification, title: 'Independent Verification Available', text: 'Third-party clearance can be arranged when the project warrants it.' },
  ],
  note: 'Health Canada states that in most situations there is no need to identify the mould species or measure airborne concentration; the priority is finding and correcting the moisture and mould problem.',
  // Слайды hero: фото в src/assets/hero/. Добавить ещё слайд = ещё объект в массив (стрелки и точки появятся сами).
  slides: [
    { image: heroMain, alt: 'Mold removal technician in a protective suit and respirator spraying treatment inside a brick building' },
    { image: heroSpray, alt: 'Technician in a protective suit spraying mold along a wall with a pump sprayer' },
    { image: heroCorner, alt: 'Black mold spreading across a wall corner next to a window' },
    { image: heroBaseboard, alt: 'Technician in a protective suit and yellow gloves spraying mold at the base of a wall' },
  ],
};

export const problems = {
  title: 'Problems We Solve',
  photo: { image: moldPetri, alt: 'Mold and bacteria colonies growing on red agar in a glass petri dish' },
  intro: 'You may not know exactly what is behind the wall — and you should not have to diagnose it before calling. Tell us what you are noticing, and we will trace the moisture, check the affected materials and explain what actually needs to be done.',
  callNote: 'Tell us\nwhat you see',
  items: [
    'A basement smells musty after rain',
    'Mold returns a few weeks after cleaning',
    'Dark spotting appears on drywall or ceilings',
    'Attic roof sheathing has visible staining',
    'A bathroom stays damp long after showers',
    'Drywall or baseboards were soaked by a leak',
    'Mold appeared after flooding or a sewer backup',
    'A wall feels damp but nothing is visible yet',
    'You are opening a wall during renovation and find mold',
    'A previous remediation did not solve the problem',
  ],
};

export const services: {
  title: string;
  text: string;
  page: ServiceKey | null;
  alt: string;
  image?: ImageMetadata;
}[] = [
  {
    title: 'Mold Inspection Oakville',
    text: 'Not every mold problem needs demolition. An inspection helps separate what is visible from what may be happening behind finishes and, just as importantly, looks for the moisture source that allowed growth in the first place.',
    page: 'inspection',
    alt: 'Technician holding a moisture meter against a water-stained wall during a mold inspection',
    image: pInspection,
  },
  {
    title: 'Mold Testing Oakville',
    text: 'Testing has a purpose when the result will answer a real question. It should not simply be added to every job. When sampling makes sense, it can be coordinated as part of the investigation or verification process.',
    page: 'inspection',
    alt: 'Mold cultures growing in a petri dish used for mold testing',
    image: pTesting,
  },
  {
    title: 'Attic Mold Removal Oakville',
    text: 'Attic mold can involve much more than cleaning roof sheathing. Roof leaks, condensation, insulation conditions and bathroom exhaust routed into the attic can all change the remediation plan.',
    page: 'attic',
    alt: 'Black mold spots on attic roof sheathing between rafters',
    image: pAttic,
  },
  {
    title: 'Basement Mold Removal Oakville',
    text: 'Basements hide moisture well. Finished walls, insulation and flooring can look normal from the room while damp materials sit behind them. We define the affected area before deciding how much needs to come out.',
    page: 'basement',
    alt: 'Damp unfinished stone basement with water on the concrete floor',
    image: pBasement,
  },
  {
    title: 'Black Mold Removal Oakville',
    text: 'Black colour alone does not tell you the species or how extensive the problem is. We focus on the moisture source, affected materials and actual remediation area instead of using colour as a reason to make the job sound worse.',
    page: 'black',
    alt: 'Heavy black mold growth in a room corner above the baseboard',
    image: pBlack,
  },
  {
    title: 'Bathroom Mold Removal Oakville',
    text: 'A bathroom can be cleaned beautifully and still grow mold again if moisture hangs around after every shower. We look beyond the surface — ventilation, leaks and concealed damp areas all matter.',
    page: 'bathroom',
    alt: 'Mold growing along tile grout lines in a bathroom',
    image: pBathroom,
  },
  {
    title: 'Crawl Space Mold Removal Oakville',
    text: 'Crawl spaces can stay damp without anyone noticing. Framing, insulation and other organic materials may remain exposed to moisture for long periods before the problem becomes obvious upstairs.',
    page: 'crawl',
    alt: 'Inspector wearing a respirator crawling through an insulated crawl space',
    image: pCrawl,
  },
  {
    title: 'Commercial Mold Remediation Oakville',
    text: 'For offices, retail units, rental properties and other commercial spaces, the scope needs to consider more than mold alone. Access, containment, occupied areas and downtime all affect how the work should be planned.',
    page: 'commercial',
    alt: 'Technician in a protective suit spraying mold-covered walls in an empty room',
    image: pCommercial,
  },
  {
    title: 'Water Damage Mold Remediation',
    text: 'A leak that is fixed is not always a moisture problem that is finished. If drywall, insulation, framing or flooring stayed wet, those materials still need to be assessed before the room is closed back up.',
    page: 'water',
    alt: 'Water-damaged ceiling opened up to expose wet, moldy framing',
    image: pWater,
  },
  {
    title: 'Emergency Mold Removal Oakville',
    text: 'Sometimes mold is discovered in the middle of another problem — after flooding, when drywall is opened, or during an active water loss. In those cases, the first priority is to understand the affected area and stop unnecessary disturbance.',
    page: 'emergency',
    alt: 'Technician in a protective suit checking mold along the lower walls of a water-damaged room',
    image: pEmergency,
  },
  {
    title: 'Post-Remediation Verification',
    text: 'The work should have a finish line. That can include a visual review, moisture checks and project documentation. Where independent clearance testing is appropriate, it can be arranged separately.',
    page: null,
    alt: 'Technician in a protective suit in a clean, treated room after mold remediation',
    image: pVerification,
  },
];
// \n — перенос строки в заголовке (на десктопе 2 строки по центру)
export const servicesTitle = 'Mold Removal & Remediation\nServices in Oakville';

// Заголовок над тёмной полосой эмблем-достижений (добавлен по просьбе владельца 2026-10-02)
export const credentialsCopy = {
  eyebrow: 'Why Oakville Homeowners Trust Us',
  title: 'Proven Experience.',
  titleAccent: 'A Process You Can Check.',
  intro: 'Every project starts with a written scope and a moisture check — so you know what is being removed, why it is being removed and what it will cost before any work begins.',
};

// Why Choose Us — принципы от владельца 2026-10-02 (title = первое предложение пункта, text — остальное, дословно)
export const whyUs = {
  eyebrow: 'Why Choose Us',
  title: 'The Principles Our Clients Value',
  items: [
    {
      icon: 'flask',
      tag: 'Testing',
      title: 'We don’t recommend paid testing when the results won’t change the plan.',
      text: 'Before suggesting a test, we explain what decision depends on its results. If we already know what needs to be done, we won’t ask you to spend money on testing you don’t need.',
    },
    {
      icon: 'child',
      tag: 'Children',
      title: 'Your children’s safety comes first.',
      text: 'Before work begins, we’ll discuss where your children will be, which areas will be off limits, and what should be moved out of the work area. Disturbing mold affected materials can release spores into the air, so children need to stay away from the work zone.',
    },
    {
      icon: 'barrier',
      tag: 'Containment',
      title: 'One moldy wall shouldn’t become a problem throughout your home.',
      text: 'Opening up affected materials can release dust and spores into nearby rooms. We contain the work area, plan the route for removing debris, and seal affected materials before carrying them out.',
    },
    {
      icon: 'paw',
      tag: 'Pets',
      title: 'We look out for your pets, too.',
      text: 'We’ll agree with you on where your cat or dog will stay during the work and put extra barriers in place to keep them out of the mold removal area. You won’t have to worry about your pet wandering among dust and tools.',
    },
  ],
};

export const utp1 = {
  title: 'We Scope the Moisture Path — Not Just the Visible Mold',
  lines: [
    'The obvious stain is sometimes the whole problem.',
    'Sometimes it is only the part you can see.',
    'Those two situations should not receive the same quote.',
  ],
  questionsIntro: 'Our starting point is simple:',
  questions: [
    'Where did the water come from?',
    'Where could it travel?',
    'Which materials stayed wet?',
    'What actually needs to be opened or removed?',
  ],
  flow: ['Source', 'Moisture Path', 'Materials', 'Remediation Scope'],
  closing: 'That order matters. Without dealing with the moisture problem, mould can return after cleanup.',
  diagram: ['Visible Spot', 'Hidden Moisture Path', 'Measured Affected Area', 'Targeted Removal'],
};

export const utp2 = {
  title: 'Remove What Needs Removing — Not Everything Around It',
  lines: ['Demolition is easy to add to a quote.', 'Putting the room back together is the expensive part.'],
  separateIntro: 'That is why we separate three things:',
  separate: ['materials that need to come out', 'materials that can be cleaned', 'materials that simply need to dry'],
  paragraphs: [
    'The point is not to make the remediation scope artificially small. It is to avoid making it artificially large.',
    'A smaller justified scope can mean less demolition, less reconstruction and less time with part of your home torn apart.',
  ],
  subsidy:
    "For recurring basement water problems, Oakville homeowners may also qualify for Halton Region's Basement Flooding Prevention Subsidy Program for certain eligible drainage improvements. Eligibility depends on the property and the work performed.",
  compare: { left: 'Automatic Tear-Out', right: 'Measured / Targeted Removal' },
};

export const checklist = {
  eyebrow: 'Checklist',
  title: 'Before You Approve a Mold Remediation Quote',
  intro: 'A few questions now can save a lot of confusion once the walls are open.',
  items: [
    { q: 'Ask what caused the moisture.', a: 'If nobody can explain the likely source, ask what is being done to investigate it.' },
    { q: 'Ask exactly what will be removed.', a: '“Remediate basement” is not a scope. Drywall, insulation, framing and flooring should be addressed separately.' },
    { q: 'Ask what will stay.', a: 'A good scope should explain both sides.' },
    { q: 'Ask whether reconstruction is included.', a: 'Removal and rebuilding are often priced separately.' },
    { q: 'Take photos before work begins.', a: 'They are useful for comparing the original condition with the completed project.' },
    { q: 'Ask why testing is being recommended.', a: 'The answer should explain what decision the result will help make.' },
    { q: 'Ask how the work area will be isolated.', a: '' },
    { q: 'Ask what determines that the job is complete.', a: '' },
    { q: 'After a flood or leak, do not leave wet materials sitting unnecessarily.', a: '' },
    { q: 'For repeated basement flooding, check local prevention programs before rebuilding the same damaged area again.', a: '' },
  ],
};

export const typical = {
  title: 'Typical Mold Problems We Handle',
  items: [
    {
      title: 'Finished Basement After Water Intrusion',
      property: 'Property: Detached home',
      text: 'A finished basement develops a musty smell after water intrusion. Instead of assuming every wall needs removal, the first job is tracing the moisture, checking affected finishes and defining the sections that actually require access.',
      alt: 'Mold on a finished basement wall next to carpet and an electrical outlet',
      image: tBasement,
    },
    {
      title: 'Attic Mold & Condensation',
      property: 'Property: Residential attic',
      text: 'Spotting appears on roof sheathing. The visible growth is only one part of the investigation; ventilation, roof leaks, insulation and exhaust routing can change what needs to be corrected.',
      alt: 'Water-stained, decaying roof sheathing in an attic',
      image: tAttic,
    },
    {
      title: 'Bathroom Ceiling Mold',
      property: 'Property: Ensuite or family bathroom',
      text: 'Recurring ceiling growth after repeated cleaning often points back to a moisture pattern. The useful question is not only how to clean it, but why the surface stays damp long enough for it to return.',
      alt: 'Mold growth spreading across a ceiling along a trim line',
      image: tBathroom,
    },
    {
      title: 'Mold Behind a Finished Wall',
      property: 'Property: Basement or main floor',
      text: 'There may be little to see from the room. Moisture evidence and limited investigative access can help determine whether opening a larger area is justified.',
      alt: 'Wallpaper peeled back to reveal mold hidden on the wall behind it',
      image: tWall,
    },
    {
      title: 'Commercial Water Loss',
      property: 'Property: Office, retail or managed property',
      text: 'Commercial remediation needs to account for access, occupied areas and business interruption as well as the physical damage itself.',
      alt: 'Technician in a protective suit and blue gloves spraying along the base of a tiled wall',
      image: tCommercial,
    },
  ],
};

export const process = {
  eyebrow: 'Our Process',
  title: 'What Happens After You Contact Us',
  steps: [
    { title: 'Tell Us What You Found', text: 'A visible patch, a musty smell, a previous leak, a flood or an inspection report is enough to start.' },
    { title: 'We Look for the Moisture Story', text: 'The affected area is checked along with the likely source and nearby materials.' },
    { title: 'You Get a Written Scope & Estimate', text: 'The quote should show what is proposed — containment, removal, cleaning, drying and any work that sits outside the remediation scope.' },
    { title: 'The Work Area Is Controlled', text: 'Containment is set up where needed. Affected materials are handled according to the agreed scope, with HEPA controls used as appropriate.' },
    { title: 'We Check Before Closing Up', text: 'The completed area is reviewed and documented. If independent post-remediation verification is justified, it can be coordinated before reconstruction.' },
  ],
};

export const local = {
  eyebrow: 'Local Expertise',
  title: 'Mold Removal Oakville — Local Moisture Problems Are Not All the Same',
  paragraphs: [
    'Oakville has a mix of older established housing, renovated properties and newer development. That matters because the same visible symptom can come from very different building conditions.',
    'Basements deserve particular attention locally. The Town of Oakville specifically warns that basement flooding can occur during severe storms and sewer-backup conditions.',
    'That does not mean every Oakville basement has a mold problem.',
    'It means that when mold appears after a water event, the water pathway matters just as much as the visible growth.',
  ],
  areasTitle: 'Areas served',
  photo: { image: moldColonies, alt: 'Close-up of green, grey and yellow mold colonies growing in a clear dish' },
  areas: ['Old Oakville', 'Bronte', 'Glen Abbey', 'River Oaks', 'West Oak Trails', 'Joshua Creek', 'Iroquois Ridge', 'Clearview', 'Palermo', 'Rural Oakville'],
};

export const pricingCopy = {
  eyebrow: 'Pricing',
  title: 'Mold Removal Cost Oakville',
  intro: 'There is no useful flat price for a problem that may be one small section of drywall — or a finished basement with concealed moisture.',
  tableIntro: 'For planning purposes, public Oakville/GTA pricing currently tends to fall into ranges like these:',
  tableHead: 'Typical project',
  tableHead2: 'Planning range',
  factorsTitle: 'What actually changes the price?',
  factors: [
    'Size of the affected area',
    'Hidden versus exposed materials',
    'Access',
    'Amount of containment required',
    'Drywall and insulation removal',
    'Attic height and access',
    'Drying requirements',
    'Reconstruction',
    'Independent testing or verification',
  ],
  closing: [
    'The number on the quote matters. The scope behind it matters more.',
    'A cheaper job is not cheaper if the water problem is left behind.',
    'A larger job is not automatically better if the demolition was unnecessary.',
    'We help define the scope first, then price the work around it.',
  ],
};

export const reviewsCopy = {
  eyebrow: 'Client Reviews',
  title: 'What Oakville Clients Say',
  intro: 'Reviews from homeowners who trusted us for safe, effective mold removal.',
};


export const equipment = {
  eyebrow: 'Equipment & Controls',
  title: 'What We Use to Control the Work',
  items: [
    { icon: 'fan', title: 'HEPA Air Filtration', text: 'Used where appropriate while contaminated material is being disturbed, helping control airborne particles inside the work zone.' },
    { icon: 'vacuum', title: 'HEPA Vacuuming', text: 'Useful during detailed cleaning of suitable surfaces as part of the remediation process.' },
    { icon: 'barrier', title: 'Containment Barriers', text: 'Temporary barriers help separate the work zone from unaffected rooms.' },
    { icon: 'gauge', title: 'Moisture Meters', text: 'A wall can look dry before the material behind it actually is. Moisture readings add evidence to the inspection.' },
    { icon: 'thermal', title: 'Thermal Imaging', text: 'Useful for locating temperature patterns that may point toward concealed moisture. It is an investigative tool, not proof by itself.' },
    { icon: 'wind', title: 'Drying & Dehumidification', text: 'When a material can reasonably be retained, controlled drying may make more sense than removing it.' },
  ],
};

export const oakville = {
  title: 'Oakville, Water Intrusion & Mold',
  paragraphs: [
    'Oakville sits in Halton Region on Lake Ontario and includes long-established communities such as Bronte and Old Oakville alongside newer residential areas.',
    "For this service, the useful local detail is not the town's history by itself.",
    'It is water.',
    'The Town warns residents about flooding during heavy thunderstorms and possible sewer backups, while Halton Region runs a dedicated basement-flooding prevention program.',
    'For a homeowner who has already dealt with basement water once, that changes the conversation:',
  ],
  emphasis: 'Do not just remove the mold. Work out why the area became wet before rebuilding it.',
  mapTitle: 'Oakville Ontario service area map',
};

export const faqCopy = {
  eyebrow: 'FAQ',
  title: 'Mold Removal Oakville — Questions Homeowners Actually Ask',
  photo: { image: basementStairs, alt: 'Unfinished basement with concrete walls, wooden stairs and a small window' },
};
export const faq = [
  {
    q: 'Do I need mold testing before mold removal?',
    a: 'Not automatically. If mold is already visible, testing may not change what needs to be done. Health Canada says that in most cases there is no need to measure airborne mould concentration or identify the exact species; finding and fixing the moisture problem is more important.',
  },
  {
    q: 'How do I know a company is not removing too much?',
    a: 'Ask for the remediation scope in writing. It should tell you which materials are being removed and why. It should also make clear what is staying. If the explanation is simply “there might be mold behind everything,” ask what evidence supports opening the larger area.',
  },
  {
    q: 'Does black mold mean the problem is more dangerous?',
    a: 'Colour does not identify the species and should not determine the demolition scope by itself. What matters to the remediation plan is where the growth is, how extensive it is, what materials are affected and why moisture was present.',
  },
  {
    q: 'Can mold come back after remediation?',
    a: 'Yes. If the original leak, humidity, condensation or drainage problem remains, the conditions that allowed the growth have not really changed. Moisture correction is a core part of preventing recurrence.',
  },
  {
    q: 'How much does mold removal cost in Oakville?',
    a: 'A small contained project may be around $500–$1,500, while larger attic, basement or multi-room work can reach several thousand dollars or more. Access, material removal, containment, drying and reconstruction can change the final number considerably.',
  },
  {
    q: 'Should clearance testing be done by an independent company?',
    a: 'When post-remediation testing is needed, using an independent party keeps the person checking the result separate from the company that performed the work. Not every project requires clearance sampling, so the reason for testing should be clear first.',
  },
  {
    q: 'Do I need a permit for mold removal in Oakville?',
    a: 'Mold cleanup by itself does not automatically mean a building permit is required. The situation can change if the project involves structural alterations, certain plumbing or drainage work, or work affecting a designated heritage property. The permit requirement should be checked against the actual renovation scope.',
  },
  {
    q: 'How quickly should I deal with wet materials after flooding?',
    a: 'As quickly as practical. The longer porous materials stay wet, the more difficult the cleanup can become. After a flood or significant leak, drying and moisture assessment should not be postponed simply because the surface looks better.',
  },
  {
    q: 'Why does attic mold come back after cleaning?',
    a: 'Because cleaning the surface does not correct condensation, ventilation problems, roof leakage or humid exhaust entering the attic. If one of those conditions remains, the same area can become damp again.',
  },
  {
    q: 'Does home insurance cover mold removal?',
    a: 'It depends on the cause of the water damage and the wording of the individual policy. If the mold followed a sudden water-loss event, document the condition before destructive work and contact the insurer early. We do not promise coverage on behalf of an insurance company.',
  },
];

export const finalCta = {
  title: 'Not Sure How Much Mold Actually Needs to Come Out?',
  lead: 'That is exactly what the first inspection should help answer.',
  text: 'Start with the moisture source, the affected materials and a clear scope — before committing to unnecessary demolition.',
  small: 'No obligation. Your information is used only to respond to your request.',
};

export const footer = {
  servicesTitle: 'Services',
  services: [
    { label: 'Mold Removal Oakville', href: '/' },
    { label: 'Mold Inspection Oakville', page: 'inspection' },
    { label: 'Mold Testing Oakville', page: 'inspection' },
    { label: 'Attic Mold Removal Oakville', page: 'attic' },
    { label: 'Basement Mold Removal Oakville', page: 'basement' },
    { label: 'Black Mold Removal Oakville', page: 'black' },
    { label: 'Bathroom Mold Removal Oakville', page: 'bathroom' },
    { label: 'Crawl Space Mold Removal Oakville', page: 'crawl' },
    { label: 'Commercial Mold Remediation Oakville', page: 'commercial' },
    { label: 'Emergency Mold Removal Oakville', page: 'emergency' },
  ] as { label: string; href?: string; page?: ServiceKey }[],
  areaTitle: 'Oakville Service Area',
  companyTitle: 'Company',
  company: [
    { label: 'About', href: '/#about' },
    { label: 'Gallery', href: '/#gallery' },
    { label: 'FAQ', href: '/#faq' },
    { label: 'Contact', href: '/#contact' },
  ],
};

export const propertyTypes = ['House', 'Condo or townhouse', 'Rental property', 'Commercial property', 'Other'];
