import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type AppLanguage = 'en' | 'sr';

type TranslationMap = Record<string, string>;

const TRANSLATIONS: Record<AppLanguage, TranslationMap> = {
  en: {
    'brand.name': 'Barber Control Headquarters',
    'brand.tagline': 'Global platform for automated barbershop booking',
    'nav.home': 'Home',
    'nav.companies': 'Marketplace',
    'nav.about': 'About',
    'nav.how': 'How it works',
    'nav.services': 'Services',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'nav.logout': 'Logout',
    'lang.switch': 'SR',
    'home.title': 'The booking platform built for barbershops worldwide',
    'home.subtitle':
      'Barber Control Headquarters is a platform for barbershops: automated appointment booking, live schedules, team and service management — so salons anywhere can run without phone chaos and missed messages.',
    'home.ctaPrimary': 'Open marketplace',
    'home.ctaSecondary': 'Create account',
    'home.ctaGuide': 'See how it works',
    'home.topShops': 'Top featured house',
    'home.viewShop': 'View this shop',
    'home.storyTitle': 'A worldwide platform for modern barbershops',
    'home.storyP1':
      'Barber Control Headquarters is built for barbershops around the world. It replaces phone calls, Instagram DMs, and paper diaries with one automated booking system that clients and owners can trust.',
    'home.storyP2':
      'Clients discover shops, pick a barber and service, choose a real free slot, and confirm in minutes. Owners publish the company, set the team, price the catalog, and let the calendar fill itself against real working hours.',
    'home.storyP3':
      'From Belgrade to New York — the same product idea: automated scheduling processes, clear services, bilingual experience (EN/SR), and a marketplace that makes every chair easier to book.',
    'home.metric1': 'barbershop profiles in the marketplace',
    'home.metric2': 'barbers with hours and contact data',
    'home.metric3': 'priced services with durations',
    'home.metric4': 'full product presentation',
    'home.featuredTitle': 'Featured destinations on the marketplace',
    'home.featuredText':
      'Explore premium-inspired profiles already live in the demo. Each shop has location context, brand positioning, and a curated gallery.',
    'home.forClientsTitle': 'Built for clients',
    'home.forClientsText':
      'Find a shop that matches your style, compare services before you commit, and reserve a seat without waiting for someone to reply.',
    'home.forClients1': 'Browse salons with clear location and brand story',
    'home.forClients2': 'Pick barber, service, date, and available slot',
    'home.forClients3': 'Confirm with contact details in one pass',
    'home.forClientsCta': 'Start browsing shops',
    'home.forOwnersTitle': 'Built for owners',
    'home.forOwnersText':
      'Stop managing the business through scattered chats. Publish a company profile, define the team, price the catalog, and let clients book against real capacity.',
    'home.forOwners1': 'Create company identity and visual presence',
    'home.forOwners2': 'Add barbers with working hours',
    'home.forOwners3': 'Publish services with price and duration',
    'home.forOwnersCta': 'Review platform services',
    'home.howTitle': 'How booking works in four moves',
    'home.howIntro':
      'The client journey is intentionally short. Every screen exists to reduce friction between “I need a cut” and “I have a confirmed time.”',
    'home.step1Title': 'Choose a shop',
    'home.step1Text': 'Open the marketplace and enter a company that fits your style and location expectations.',
    'home.step2Title': 'Select barber & service',
    'home.step2Text': 'See who is available and what packages are offered with transparent pricing.',
    'home.step3Title': 'Pick a free slot',
    'home.step3Text': 'Use the calendar to reserve capacity against the barber’s working hours.',
    'home.step4Title': 'Confirm details',
    'home.step4Text': 'Submit contact information and lock the appointment into the shop schedule.',
    'home.howCta': 'Read the full usage guide',
    'home.depthTitle': 'What makes this more than a landing page',
    'home.depthP1':
      'Barber Control Headquarters is designed as infrastructure. The marketplace is the acquisition surface. The company page is the conversion surface. The owner tools are the retention and operations surface.',
    'home.depthP2':
      'That means the same product can be used to sell the idea to partners, demonstrate booking UX to clients, and show owners how daily capacity becomes measurable once services and hours are defined.',
    'home.depthP3':
      'Under the UI sits a clean domain model: companies, owners, barbers, haircuts/services, and appointments. The frontend presents that model as a premium, bilingual product experience ready for portfolio and investor demos.',
    'home.linkAbout': 'Mission, product thinking, and who the platform is for.',
    'home.linkHow': 'Step-by-step client and owner flows with best practices.',
    'home.linkServices': 'Capabilities for clients, owners, and operations.',
    'home.finalTitle': 'Ready to treat booking like a real product?',
    'home.finalText':
      'Open the marketplace, walk through a full reservation, then switch language and review the owner-side story. This is how a modern barbershop platform should feel.',
    'companies.kicker': 'Marketplace',
    'companies.title': 'Barbershop destinations',
    'companies.subtitle':
      'Explore premium-inspired houses with full stories, specialty menus, and bookable barbers — then reserve a chair in minutes.',
    'companies.loading': 'Loading companies...',
    'companies.create': 'Create Company',
    'companies.details': 'View house',
    'company.title': 'Company profile',
    'company.barbers': 'The team',
    'company.teamTitle': 'Meet the barbers behind the chair',
    'company.teamText':
      'Each barber has a craft focus, working hours, and a booking lane. Select a profile to open live availability.',
    'company.meetTeam': 'Meet the team',
    'company.readStory': 'Read the house story',
    'company.theHouse': 'The house',
    'company.storyTitle': 'Craft, room, and reputation',
    'company.address': 'Address',
    'company.hoursLabel': 'Hours',
    'company.priceLabel': 'Pricing',
    'company.specialties': 'House specialties',
    'company.menuTitle': 'Service menu',
    'company.menuText': 'Transparent duration and pricing before you confirm a slot.',
    'company.bookWith': 'Book this barber',
    'company.registerAndBook': 'Register and book a treatment',
    'company.selectedBarber': 'Selected for booking',
    'company.addBarber': 'Add barber',
    'company.addService': 'Add service',
    'company.appointments': 'Book with',
    'company.pickDate': 'Select date',
    'company.chooseSlot': 'Choose slot',
    'company.selectedSlot': 'Selected',
    'company.bookNow': 'Confirm appointment',
    'company.bookingLoading': 'Booking...',
    'company.bookingHint': 'Use the same email as your registered and verified account.',
    'company.registerGateTitle': 'Create an account to book',
    'company.registerGateText':
      'Anonymous users cannot book. Register, verify your email, then confirm a treatment with this barber.',
    'company.registerGateCta': 'Register and book a treatment',
    'company.registerGateLogin': 'Already have an account? Log in',
    'company.packages': 'Service packages',
    'company.firstName': 'First name',
    'company.lastName': 'Last name',
    'company.email': 'Email address',
    'company.phone': 'Phone number',
    'company.ownerTitle': 'Create company owner',
    'company.ownersExisting': 'Existing owners',
    'company.assignOwner': 'Assign owner',
    'company.noAppointments': 'No free appointments for selected date.',
    'createCompany.title': 'Create a premium barbershop profile',
    'createCompany.subtitle': 'Set your brand name and upload high-quality images.',
    'createCompany.name': 'Company name',
    'createCompany.images': 'Company images',
    'createCompany.submit': 'Create company',
    'createCompany.browse': 'Browse images',
    'createCompany.validation': 'Please upload at least one image.',
    'createBarber.title': 'Add barber to your team',
    'createBarber.subtitle': 'Set contact details and working hours.',
    'createBarber.name': 'Barber name',
    'createBarber.phone': 'Phone number',
    'createBarber.email': 'Email',
    'createBarber.password': 'Barber password',
    'createBarber.start': 'Work start time',
    'createBarber.end': 'Work end time',
    'createBarber.submit': 'Save barber',
    'addHaircut.title': 'Create premium service',
    'addHaircut.subtitle': 'Define service type, price and duration.',
    'addHaircut.type': 'Service type',
    'addHaircut.price': 'Price',
    'addHaircut.duration': 'Duration',
    'addHaircut.submit': 'Save service',
    'auth.loginTitle': 'Welcome back',
    'auth.loginSubtitle': 'Login to continue with booking and management.',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.loginButton': 'Login',
    'auth.loginLoading': 'Signing in...',
    'auth.noAccount': 'No account yet?',
    'auth.hasAccount': 'Already have an account?',
    'auth.checkEmailTitle': 'Check your email',
    'auth.goLoginAfterVerify': 'Go to login',
    'auth.registerTitle': 'Create your account',
    'auth.registerSubtitle': 'Join and start booking in seconds.',
    'auth.firstName': 'First name',
    'auth.lastName': 'Last name',
    'auth.phone': 'Phone number',
    'auth.confirmPassword': 'Confirm password',
    'auth.registerButton': 'Create account',
    'auth.registerLoading': 'Creating account...',
    'auth.passwordRulesTitle': 'Password must include:',
    'auth.passwordRuleLength': 'At least 6 characters',
    'auth.passwordRuleDigit': 'At least one digit (0–9)',
    'auth.passwordRuleUpper': 'At least one uppercase letter (A–Z)',
    'auth.passwordRuleLower': 'At least one lowercase letter (a–z)',
    'auth.passwordRuleSpecial': 'At least one special character (!@#$…)',
    'auth.passwordRuleMatch': 'Passwords match',
    'auth.fillAllFields': 'Please fill in all fields.',
    'auth.passwordsMismatch': 'Passwords do not match.',
    'auth.registerSuccess':
      'Account created. Open your email, click the verification link, then log in.',
    'verify.kicker': 'Email verification',
    'verify.successTitle': 'Email confirmed',
    'verify.errorTitle': 'Verification failed',
    'verify.goLogin': 'Go to login',
    'owner.title': 'Create company owner',
    'owner.subtitle': 'Add a dedicated owner profile for this company.',
    'owner.submit': 'Create owner',
    'profile.title': 'Profile',
    'profile.subtitle': 'Your profile features are coming soon.',
    'common.required': 'This field is required.'
  },
  sr: {
    'brand.name': 'Barber Control Headquarters',
    'brand.tagline': 'Globalna platforma za automatizovano zakazivanje berbernica',
    'nav.home': 'Početna',
    'nav.companies': 'Berbernice',
    'nav.about': 'O nama',
    'nav.how': 'Kako se koristi',
    'nav.services': 'Usluge',
    'nav.login': 'Prijava',
    'nav.register': 'Registracija',
    'nav.logout': 'Odjava',
    'lang.switch': 'EN',
    'home.title': 'Platforma za zakazivanje berbernica širom sveta',
    'home.subtitle':
      'Barber Control Headquarters je platforma za berbernice: automatizovano zakazivanje termina, živi rasporedi, upravljanje timom i uslugama — da saloni bilo gde rade bez telefonskog haosa i propuštenih poruka.',
    'home.ctaPrimary': 'Otvori berbernice',
    'home.ctaSecondary': 'Napravi nalog',
    'home.ctaGuide': 'Pogledaj kako radi',
    'home.topShops': 'Top istaknuta kuća',
    'home.viewShop': 'Pogledaj ovaj salon',
    'home.storyTitle': 'Svetska platforma za moderne berbernice',
    'home.storyP1':
      'Barber Control Headquarters je napravljen za berbernice širom sveta. Menja telefone, Instagram poruke i papirne termine jednim automatizovanim sistemom zakazivanja kojem klijenti i vlasnici mogu da veruju.',
    'home.storyP2':
      'Klijenti otkrivaju salone, biraju frizera i uslugu, uzimaju stvarno slobodan termin i potvrđuju za par minuta. Vlasnici objavljuju kompaniju, postavljaju tim, cene kataloga i puštaju kalendar da se puni prema stvarnom radnom vremenu.',
    'home.storyP3':
      'Od Beograda do Njujorka — ista ideja proizvoda: automatizovani procesi zakazivanja, jasne usluge, dvojezično iskustvo (SR/EN) i katalog berbernica koji olakšava rezervaciju svake stolice.',
    'home.metric1': 'profila berbernica u katalogu',
    'home.metric2': 'frizera sa satnicom i kontaktom',
    'home.metric3': 'usluga sa cenom i trajanjem',
    'home.metric4': 'puna prezentacija proizvoda',
    'home.featuredTitle': 'Istaknute destinacije u katalogu',
    'home.featuredText':
      'Istraži premium profile koji su već živi u demou. Svaki salon ima lokaciju, pozicioniranje brenda i kuriranu galeriju.',
    'home.forClientsTitle': 'Za klijente',
    'home.forClientsText':
      'Pronađi salon koji odgovara tvom stilu, uporedi usluge pre odluke i rezerviši mesto bez čekanja da ti neko odgovori.',
    'home.forClients1': 'Pregledaj salone sa jasnom lokacijom i pričom brenda',
    'home.forClients2': 'Izaberi frizera, uslugu, datum i slobodan termin',
    'home.forClients3': 'Potvrdi kontakt podatke u jednom prolazu',
    'home.forClientsCta': 'Počni pregled salona',
    'home.forOwnersTitle': 'Za vlasnike',
    'home.forOwnersText':
      'Prestani da vodiš biznis kroz rasute ćaskanja. Objavi profil kompanije, definiši tim, cene kataloga i dozvoli klijentima da rezervišu prema stvarnom kapacitetu.',
    'home.forOwners1': 'Kreiraj identitet kompanije i vizuelno prisustvo',
    'home.forOwners2': 'Dodaj frizere sa radnim vremenom',
    'home.forOwners3': 'Objavi usluge sa cenom i trajanjem',
    'home.forOwnersCta': 'Pogledaj usluge platforme',
    'home.howTitle': 'Kako rezervacija radi u četiri poteza',
    'home.howIntro':
      'Put klijenta je namerno kratak. Svaki ekran postoji da smanji trenje između „treba mi šišanje“ i „imam potvrđen termin“.',
    'home.step1Title': 'Izaberi salon',
    'home.step1Text': 'Otvori katalog berbernica i uđi u kompaniju koja odgovara stilu i očekivanjima lokacije.',
    'home.step2Title': 'Izaberi frizera i uslugu',
    'home.step2Text': 'Vidi ko je dostupan i koje pakete salon nudi uz transparentne cene.',
    'home.step3Title': 'Odaberi slobodan termin',
    'home.step3Text': 'Kalendarom rezerviši kapacitet prema radnom vremenu frizera.',
    'home.step4Title': 'Potvrdi podatke',
    'home.step4Text': 'Pošalji kontakt informacije i zaključaj termin u raspored salona.',
    'home.howCta': 'Pročitaj puni vodič',
    'home.depthTitle': 'Zašto ovo nije samo početna stranica',
    'home.depthP1':
      'Barber Control Headquarters je dizajniran kao infrastruktura. Katalog berbernica je sloj akvizicije. Stranica kompanije je sloj konverzije. Alati za vlasnike su sloj zadržavanja i operativa.',
    'home.depthP2':
      'Isti proizvod može da se koristi za prodaju ideje partnerima, demonstraciju zakazivanja klijentima i pokazivanje vlasnicima kako dnevni kapacitet postaje merljiv čim se definišu usluge i satnica.',
    'home.depthP3':
      'Ispod interfejsa stoji čist domen model: kompanije, vlasnici, frizeri, usluge i termini. Frontend to predstavlja kao premium, dvojezično iskustvo spremno za portfolio i investitorske demoe.',
    'home.linkAbout': 'Misija, razmišljanje o proizvodu i za koga je platforma.',
    'home.linkHow': 'Korak-po-korak tokovi za klijente i vlasnike.',
    'home.linkServices': 'Sposobnosti za klijente, vlasnike i operativu.',
    'home.finalTitle': 'Spremni da tretiraš zakazivanje kao pravi proizvod?',
    'home.finalText':
      'Otvori katalog berbernica, prođi kroz punu rezervaciju, promeni jezik i pregledaj priču za vlasnike. Ovako treba da izgleda moderna platforma za berbernice.',
    'companies.kicker': 'Katalog',
    'companies.title': 'Berberske destinacije',
    'companies.subtitle':
      'Istraži premium kuće sa punom pričom, specijalitetima i frizerima koje možeš da rezervišeš — pa zauzmi stolicu za par minuta.',
    'companies.loading': 'Učitavanje kompanija...',
    'companies.create': 'Kreiraj kompaniju',
    'companies.details': 'Pogledaj kuću',
    'company.title': 'Profil kompanije',
    'company.barbers': 'Tim',
    'company.teamTitle': 'Upoznaj frizere iza stolice',
    'company.teamText':
      'Svaki frizer ima fokus zanata, radno vreme i svoj tok zakazivanja. Izaberi profil da otvoriš dostupne termine.',
    'company.meetTeam': 'Upoznaj tim',
    'company.readStory': 'Pročitaj priču kuće',
    'company.theHouse': 'Kuća',
    'company.storyTitle': 'Zanat, prostor i reputacija',
    'company.address': 'Adresa',
    'company.hoursLabel': 'Radno vreme',
    'company.priceLabel': 'Cene',
    'company.specialties': 'Specijaliteti kuće',
    'company.menuTitle': 'Meni usluga',
    'company.menuText': 'Trajanje i cena su jasni pre nego što potvrdiš termin.',
    'company.bookWith': 'Zakaži kod ovog frizera',
    'company.registerAndBook': 'Registruj se i zakaži tretman',
    'company.selectedBarber': 'Izabran za rezervaciju',
    'company.addBarber': 'Dodaj frizera',
    'company.addService': 'Dodaj uslugu',
    'company.appointments': 'Rezerviši kod',
    'company.pickDate': 'Izaberi datum',
    'company.chooseSlot': 'Izaberi termin',
    'company.selectedSlot': 'Izabrano',
    'company.bookNow': 'Potvrdi termin',
    'company.bookingLoading': 'Zakazivanje...',
    'company.bookingHint': 'Unesite isti email kao na registrovanom i verifikovanom nalogu.',
    'company.registerGateTitle': 'Napravite nalog da biste zakazali',
    'company.registerGateText':
      'Anonimni korisnici ne mogu da zakazuju. Registrujte se, verifikujte email, pa potvrdite tretman kod ovog frizera.',
    'company.registerGateCta': 'Registruj se i zakaži tretman',
    'company.registerGateLogin': 'Već imate nalog? Prijavite se',
    'company.packages': 'Paketi usluga',
    'company.firstName': 'Ime',
    'company.lastName': 'Prezime',
    'company.email': 'Email adresa',
    'company.phone': 'Broj telefona',
    'company.ownerTitle': 'Kreiraj vlasnika kompanije',
    'company.ownersExisting': 'Postojeći vlasnici',
    'company.assignOwner': 'Dodeli vlasnika',
    'company.noAppointments': 'Nema slobodnih termina za izabrani datum.',
    'createCompany.title': 'Kreiraj premium profil berbernice',
    'createCompany.subtitle': 'Postavi naziv brenda i ubaci kvalitetne slike.',
    'createCompany.name': 'Naziv kompanije',
    'createCompany.images': 'Slike kompanije',
    'createCompany.submit': 'Kreiraj kompaniju',
    'createCompany.browse': 'Izaberi slike',
    'createCompany.validation': 'Dodaj bar jednu sliku.',
    'createBarber.title': 'Dodaj frizera u tim',
    'createBarber.subtitle': 'Unesi kontakt podatke i radno vreme.',
    'createBarber.name': 'Ime frizera',
    'createBarber.phone': 'Broj telefona',
    'createBarber.email': 'Email',
    'createBarber.password': 'Lozinka frizera',
    'createBarber.start': 'Početak smene',
    'createBarber.end': 'Kraj smene',
    'createBarber.submit': 'Sačuvaj frizera',
    'addHaircut.title': 'Kreiraj premium uslugu',
    'addHaircut.subtitle': 'Definiši tip usluge, cenu i trajanje.',
    'addHaircut.type': 'Tip usluge',
    'addHaircut.price': 'Cena',
    'addHaircut.duration': 'Trajanje',
    'addHaircut.submit': 'Sačuvaj uslugu',
    'auth.loginTitle': 'Dobrodošli nazad',
    'auth.loginSubtitle': 'Prijavi se i nastavi sa rezervacijama.',
    'auth.email': 'Email',
    'auth.password': 'Lozinka',
    'auth.loginButton': 'Prijavi se',
    'auth.loginLoading': 'Prijava...',
    'auth.noAccount': 'Nemate nalog?',
    'auth.hasAccount': 'Već imate nalog?',
    'auth.checkEmailTitle': 'Proverite email',
    'auth.goLoginAfterVerify': 'Idi na prijavu',
    'auth.registerTitle': 'Kreiraj nalog',
    'auth.registerSubtitle': 'Registruj se i zakaži termin za par sekundi.',
    'auth.firstName': 'Ime',
    'auth.lastName': 'Prezime',
    'auth.phone': 'Telefon',
    'auth.confirmPassword': 'Potvrdi lozinku',
    'auth.registerButton': 'Kreiraj nalog',
    'auth.registerLoading': 'Kreiranje naloga...',
    'auth.passwordRulesTitle': 'Lozinka mora da sadrži:',
    'auth.passwordRuleLength': 'Najmanje 6 karaktera',
    'auth.passwordRuleDigit': 'Najmanje jednu cifru (0–9)',
    'auth.passwordRuleUpper': 'Najmanje jedno veliko slovo (A–Z)',
    'auth.passwordRuleLower': 'Najmanje jedno malo slovo (a–z)',
    'auth.passwordRuleSpecial': 'Najmanje jedan specijalan karakter (!@#$…)',
    'auth.passwordRuleMatch': 'Lozinke se poklapaju',
    'auth.fillAllFields': 'Popunite sva polja.',
    'auth.passwordsMismatch': 'Lozinke se ne poklapaju.',
    'auth.registerSuccess':
      'Nalog je kreiran. Otvorite email i kliknite na verifikacioni link, zatim se prijavite.',
    'verify.kicker': 'Verifikacija emaila',
    'verify.successTitle': 'Email potvrđen',
    'verify.errorTitle': 'Verifikacija nije uspela',
    'verify.goLogin': 'Idi na prijavu',
    'owner.title': 'Kreiraj vlasnika',
    'owner.subtitle': 'Dodaj profil vlasnika za ovu kompaniju.',
    'owner.submit': 'Kreiraj vlasnika',
    'profile.title': 'Profil',
    'profile.subtitle': 'Opcije profila stižu uskoro.',
    'common.required': 'Polje je obavezno.'
  }
};

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private readonly storageKey = 'barberapp.language';
  private readonly languageSubject = new BehaviorSubject<AppLanguage>(this.getInitialLanguage());

  readonly language$ = this.languageSubject.asObservable();

  get language(): AppLanguage {
    return this.languageSubject.value;
  }

  setLanguage(language: AppLanguage): void {
    this.languageSubject.next(language);
    localStorage.setItem(this.storageKey, language);
  }

  toggleLanguage(): void {
    this.setLanguage(this.language === 'en' ? 'sr' : 'en');
  }

  t(key: string): string {
    const current = TRANSLATIONS[this.language][key];
    if (current) {
      return current;
    }

    return TRANSLATIONS.en[key] ?? key;
  }

  private getInitialLanguage(): AppLanguage {
    const stored = localStorage.getItem(this.storageKey);
    if (stored === 'en' || stored === 'sr') {
      return stored;
    }

    return 'en';
  }
}
