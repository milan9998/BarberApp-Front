import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type AppLanguage = 'en' | 'sr';

type TranslationMap = Record<string, string>;

const TRANSLATIONS: Record<AppLanguage, TranslationMap> = {
  en: {
    'brand.name': 'Barber Visual',
    'brand.tagline': 'Booking infrastructure for modern barbershops',
    'nav.home': 'Home',
    'nav.companies': 'Marketplace',
    'nav.about': 'About',
    'nav.how': 'How it works',
    'nav.services': 'Services',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'nav.logout': 'Logout',
    'lang.switch': 'SR',
    'home.title': 'Book better. Run cleaner. Grow a sharper shop.',
    'home.subtitle':
      'A bilingual marketplace and operations layer for barbershops — discover salons, book real slots, and manage teams, services, and schedules in one product.',
    'home.ctaPrimary': 'Open marketplace',
    'home.ctaSecondary': 'Create account',
    'home.ctaGuide': 'See how it works',
    'home.topShops': 'Top featured house',
    'home.viewShop': 'View this shop',
    'home.storyTitle': 'A serious platform for a fragmented industry',
    'home.storyP1':
      'Most barbershops still run on phone calls, Instagram DMs, and handwritten diaries. That creates missed messages, double bookings, unclear pricing, and empty chairs that should have been filled.',
    'home.storyP2':
      'Barber Visual turns that chaos into a structured product: a public marketplace for clients and an operational backbone for owners. Companies, barbers, services, and appointments are connected in one flow from discovery to confirmation.',
    'home.storyP3':
      'The demo already behaves like a production-shaped system — seeded with global-inspired shop brands, real service catalogs, working hours, and a complete booking journey in English and Serbian.',
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
      'Barber Visual is designed as infrastructure. The marketplace is the acquisition surface. The company page is the conversion surface. The owner tools are the retention and operations surface.',
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
    'company.selectedBarber': 'Selected for booking',
    'company.addBarber': 'Add barber',
    'company.addService': 'Add service',
    'company.appointments': 'Book with',
    'company.pickDate': 'Select date',
    'company.chooseSlot': 'Choose slot',
    'company.selectedSlot': 'Selected',
    'company.bookNow': 'Confirm appointment',
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
    'auth.registerTitle': 'Create your account',
    'auth.registerSubtitle': 'Join and start booking in seconds.',
    'auth.firstName': 'First name',
    'auth.lastName': 'Last name',
    'auth.phone': 'Phone number',
    'auth.confirmPassword': 'Confirm password',
    'auth.registerButton': 'Create account',
    'owner.title': 'Create company owner',
    'owner.subtitle': 'Add a dedicated owner profile for this company.',
    'owner.submit': 'Create owner',
    'profile.title': 'Profile',
    'profile.subtitle': 'Your profile features are coming soon.',
    'common.required': 'This field is required.'
  },
  sr: {
    'brand.name': 'Barber Visual',
    'brand.tagline': 'Infrastruktura za zakazivanje modernih berbernica',
    'nav.home': 'Pocetna',
    'nav.companies': 'Marketplace',
    'nav.about': 'O nama',
    'nav.how': 'Kako se koristi',
    'nav.services': 'Usluge',
    'nav.login': 'Prijava',
    'nav.register': 'Registracija',
    'nav.logout': 'Odjava',
    'lang.switch': 'EN',
    'home.title': 'Bolje zakazivanje. Cistiji rad. Jaci salon.',
    'home.subtitle':
      'Dvojezični marketplace i operativni sloj za berbernice — pronadji salon, rezervisi pravi termin i vodi tim, usluge i raspored u jednom proizvodu.',
    'home.ctaPrimary': 'Otvori marketplace',
    'home.ctaSecondary': 'Napravi nalog',
    'home.ctaGuide': 'Pogledaj kako radi',
    'home.topShops': 'Top istaknuta kuca',
    'home.viewShop': 'Pogledaj ovaj salon',
    'home.storyTitle': 'Ozbiljna platforma za fragmentisanu industriju',
    'home.storyP1':
      'Vecina berbernica i dalje radi preko telefona, Instagram poruka i papirnih termina. To pravi propuštene poruke, duple rezervacije, nejasne cene i prazne stolice koje su mogle biti popunjene.',
    'home.storyP2':
      'Barber Visual pretvara taj haos u strukturisan proizvod: javni marketplace za klijente i operativni kičmični sistem za vlasnike. Kompanije, frizeri, usluge i termini povezani su u jedan tok — od otkrivanja do potvrde.',
    'home.storyP3':
      'Demo vec izgleda kao produkcijski oblikovan sistem — sa brendovima inspirisanim globalnim salonima, katalogom usluga, radnim vremenom i kompletnim booking tokom na engleskom i srpskom.',
    'home.metric1': 'profila berbernica na marketplace-u',
    'home.metric2': 'frizera sa satnicom i kontaktom',
    'home.metric3': 'usluga sa cenom i trajanjem',
    'home.metric4': 'puna prezentacija proizvoda',
    'home.featuredTitle': 'Istaknute destinacije na marketplace-u',
    'home.featuredText':
      'Istrazi premium profile koji su vec zivi u demou. Svaki salon ima lokaciju, pozicioniranje brenda i kuriranu galeriju.',
    'home.forClientsTitle': 'Za klijente',
    'home.forClientsText':
      'Pronadji salon koji odgovara tvom stilu, uporedi usluge pre odluke i rezervisi mesto bez cekanja da ti neko odgovori.',
    'home.forClients1': 'Pregledaj salone sa jasnom lokacijom i pricom brenda',
    'home.forClients2': 'Izaberi frizera, uslugu, datum i slobodan slot',
    'home.forClients3': 'Potvrdi kontakt podatke u jednom prolazu',
    'home.forClientsCta': 'Pocni pregled salona',
    'home.forOwnersTitle': 'Za vlasnike',
    'home.forOwnersText':
      'Prestani da vodis biznis kroz rasute chatove. Objavi profil kompanije, definisi tim, cene kataloga i dozvoli klijentima da rezervisu prema stvarnom kapacitetu.',
    'home.forOwners1': 'Kreiraj identitet kompanije i vizuelno prisustvo',
    'home.forOwners2': 'Dodaj frizere sa radnim vremenom',
    'home.forOwners3': 'Objavi usluge sa cenom i trajanjem',
    'home.forOwnersCta': 'Pogledaj usluge platforme',
    'home.howTitle': 'Kako rezervacija radi u cetiri poteza',
    'home.howIntro':
      'Put klijenta je namerno kratak. Svaki ekran postoji da smanji trenje izmedju „treba mi sisanje“ i „imam potvrdjen termin“.',
    'home.step1Title': 'Izaberi salon',
    'home.step1Text': 'Otvori marketplace i udji u kompaniju koja odgovara stilu i ocekivanjima lokacije.',
    'home.step2Title': 'Izaberi frizera i uslugu',
    'home.step2Text': 'Vidi ko je dostupan i koje pakete salon nudi uz transparentne cene.',
    'home.step3Title': 'Odaberi slobodan slot',
    'home.step3Text': 'Kalendarom rezervisi kapacitet prema radnom vremenu frizera.',
    'home.step4Title': 'Potvrdi podatke',
    'home.step4Text': 'Posalji kontakt informacije i zakljucaj termin u raspored salona.',
    'home.howCta': 'Procitaj puni vodic',
    'home.depthTitle': 'Zasto ovo nije samo landing stranica',
    'home.depthP1':
      'Barber Visual je dizajniran kao infrastruktura. Marketplace je sloj akvizicije. Stranica kompanije je sloj konverzije. Owner alati su sloj zadrzavanja i operativa.',
    'home.depthP2':
      'Isti proizvod moze da se koristi za prodaju ideje partnerima, demonstraciju booking UX-a klijentima i pokazivanje vlasnicima kako dnevni kapacitet postaje merljiv cim se definisu usluge i satnica.',
    'home.depthP3':
      'Ispod UI-ja stoji cist domen model: kompanije, vlasnici, frizeri, usluge i termini. Frontend to predstavlja kao premium, dvojezično iskustvo spremno za portfolio i investitorske demoe.',
    'home.linkAbout': 'Misija, razmisljanje o proizvodu i za koga je platforma.',
    'home.linkHow': 'Korak-po-korak tokovi za klijente i vlasnike.',
    'home.linkServices': 'Sposobnosti za klijente, vlasnike i operativu.',
    'home.finalTitle': 'Spremni da tretiras zakazivanje kao pravi proizvod?',
    'home.finalText':
      'Otvori marketplace, prodji kroz punu rezervaciju, promeni jezik i pregledaj owner pricu. Ovako treba da izgleda moderna platforma za berbernice.',
    'companies.kicker': 'Marketplace',
    'companies.title': 'Berberske destinacije',
    'companies.subtitle':
      'Istrazi premium kuce sa punom pricom, specijalitetima i frizerima koje mozes da rezervises — pa zauzmi stolicu za par minuta.',
    'companies.loading': 'Ucitavanje kompanija...',
    'companies.create': 'Kreiraj kompaniju',
    'companies.details': 'Pogledaj kucu',
    'company.title': 'Profil kompanije',
    'company.barbers': 'Tim',
    'company.teamTitle': 'Upoznaj frizere iza stolice',
    'company.teamText':
      'Svaki frizer ima fokus zanata, radno vreme i svoj booking tok. Izaberi profil da otvoris dostupne termine.',
    'company.meetTeam': 'Upoznaj tim',
    'company.readStory': 'Procitaj pricu kuce',
    'company.theHouse': 'Kuca',
    'company.storyTitle': 'Zanat, prostor i reputacija',
    'company.address': 'Adresa',
    'company.hoursLabel': 'Radno vreme',
    'company.priceLabel': 'Cene',
    'company.specialties': 'Specijaliteti kuce',
    'company.menuTitle': 'Meni usluga',
    'company.menuText': 'Trajanje i cena su jasni pre nego sto potvrdis termin.',
    'company.bookWith': 'Zakazi kod ovog frizera',
    'company.selectedBarber': 'Izabran za rezervaciju',
    'company.addBarber': 'Dodaj frizera',
    'company.addService': 'Dodaj uslugu',
    'company.appointments': 'Rezervisi kod',
    'company.pickDate': 'Izaberi datum',
    'company.chooseSlot': 'Izaberi termin',
    'company.selectedSlot': 'Izabrano',
    'company.bookNow': 'Potvrdi termin',
    'company.packages': 'Paketi usluga',
    'company.firstName': 'Ime',
    'company.lastName': 'Prezime',
    'company.email': 'Email adresa',
    'company.phone': 'Broj telefona',
    'company.ownerTitle': 'Kreiraj vlasnika kompanije',
    'company.ownersExisting': 'Postojeci vlasnici',
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
    'createBarber.start': 'Pocetak smene',
    'createBarber.end': 'Kraj smene',
    'createBarber.submit': 'Sacuvaj frizera',
    'addHaircut.title': 'Kreiraj premium uslugu',
    'addHaircut.subtitle': 'Definisi tip usluge, cenu i trajanje.',
    'addHaircut.type': 'Tip usluge',
    'addHaircut.price': 'Cena',
    'addHaircut.duration': 'Trajanje',
    'addHaircut.submit': 'Sacuvaj uslugu',
    'auth.loginTitle': 'Dobrodosli nazad',
    'auth.loginSubtitle': 'Prijavi se i nastavi sa rezervacijama.',
    'auth.email': 'Email',
    'auth.password': 'Lozinka',
    'auth.loginButton': 'Prijavi se',
    'auth.registerTitle': 'Kreiraj nalog',
    'auth.registerSubtitle': 'Registruj se i zakazi termin za par sekundi.',
    'auth.firstName': 'Ime',
    'auth.lastName': 'Prezime',
    'auth.phone': 'Telefon',
    'auth.confirmPassword': 'Potvrdi lozinku',
    'auth.registerButton': 'Kreiraj nalog',
    'owner.title': 'Kreiraj vlasnika',
    'owner.subtitle': 'Dodaj profil vlasnika za ovu kompaniju.',
    'owner.submit': 'Kreiraj vlasnika',
    'profile.title': 'Profil',
    'profile.subtitle': 'Opcije profila stizu uskoro.',
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
