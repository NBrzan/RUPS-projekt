export const elementaryChallenges = [
  {
    prompt: 'Sestavi preprosti električni krog z baterijo in svetilko.',
    requiredComponents: ['baterija', 'svetilka', 'žica', 'žica', 'žica', 'žica', 'žica', 'žica'],
    theory: ['Osnovni električni krog potrebuje vir, to je v našem primeru baterija. Potrebuje tudi porabnike, to je svetilka. Električni krog je v našem primeru sklenjen, kar je nujno potrebno, da električni tok teče preko prevodnikov oziroma žic.']
  },
  {
    prompt: 'Sestavi preprosti nesklenjeni električni krog z baterijo, svetilko in stikalom.',
    requiredComponents: ['baterija', 'svetilka', 'žica', 'stikalo-off'],
    theory: ['V nesklenjenem krogu je stikalo odprto, kar pomeni, da je električni tok prekinjen. Svetilka posledično zato ne sveti.']
  },
  {
    prompt: 'Sestavi preprosti sklenjeni električni krog z baterijo, svetilko in stikalom.',
    requiredComponents: ['baterija', 'svetilka', 'žica', 'stikalo-on'],
    theory: ['V sklenjenem krogu je stikalo zaprto, kar pomeni, da lahko električni tok teče neovirano. Torej v tem primeru so vrata zaprta.']
  },
  {
    prompt: 'Sestavi električni krog z baterijo, svetilko in stikalom, ki ga lahko ugašaš in prižigaš.',
    requiredComponents: ['baterija', 'svetilka', 'žica', 'stikalo-on', 'stikalo-off'],
    theory: ['Stikalo nam omogoča nadzor nad pretokom električnega toka. Ko je stikalo zaprto, tok teče in posledično svetilka sveti. Kadar pa je stikalo odprto, tok ne teče in se svetilka ugasne. To lahko primerjamo z vklapljanjem in izklopljanjem električnih naprav v naših domovih.']
  },
  {
    prompt: 'Sestavi krog z dvema baterijama in svetilko. ',
    requiredComponents: ['baterija', 'baterija', 'svetilka', 'žica'],
    theory: ['Kadar vežemo dve ali več baterij zaporedno, se napetosti seštevajo. Večja je napetost, večji je električni tok. V našem primeru zato svetilka sveti močneje.']
  },
  {
    prompt: 'V električni krog zaporedno poveži dve svetilki, ki ju priključiš na baterijo. ',
    requiredComponents: ['baterija', 'svetilka', 'svetilka', 'žica'],
    theory: ['V zaporedni vezavi teče isti električni tok skozi vse svetilke. Napetost baterije se porazdeli. Če imamo primer, da ena svetilka preneha delovati, bo ta prekinila tok skozi drugo svetilko.']
  },
  {
    prompt: 'V električni krog vzporedno poveži dve svetilki, ki ju priključiš na baterijo. ',
    requiredComponents: ['baterija', 'svetilka', 'svetilka', 'žica'],
    theory: ['V vzporedni vezavi ima vsaka svetilka enako napetost kot baterija. Eletrični tok se porazdeli med svetilkami. Če ena svetilka preneha delovati, bo druga še vedno delovala.']
  },
  {
    prompt: 'Sestavi električni krog s svetilko in uporom. ',
    requiredComponents: ['baterija', 'svetilka', 'žica', 'upor'],
    theory: ['Upor omejuje tok v krogu. Večji kot je upor, manjši je tok. Spoznajmo Ohmov zakon: tok (I) = napetost (U) / upornost (R). Svetilka bo svetila manj intenzivno, saj skozi njo teče manjši tok.']
  }
];

export const highSchoolChallenges = [
  {
    prompt: 'Sestavi električni krog z dvema uporoma in izračunaj skupno upornost.',
    requiredComponents: ['baterija', 'upor', 'upor', 'žica'],
    theory: ['Upora sta vezana zaporedno. Skupna upornost je vsota posameznih uporov: R_total = R1 + R2.']
  },
  {
    prompt: 'Sestavi električni krog z dvema uporoma vezanima vzporedno.',
    requiredComponents: ['baterija', 'upor', 'upor', 'žica'],
    theory: ['Pri vzporedni vezavi uporov: 1/R_total = 1/R1 + 1/R2. Skupna upornost je manjša od najmanjšega upora.']
  },
  {
    prompt: 'Dodaj ampermeter v krog in preveri tok skozi svetilko.',
    requiredComponents: ['baterija', 'svetilka', 'ampermeter', 'žica'],
    theory: ['Ampermeter se veže zaporedno v krog. Prikazuje tok, ki teče skozi svetilko.']
  },
  {
    prompt: 'Dodaj voltmeter in izmeri napetost na svetilki.',
    requiredComponents: ['baterija', 'svetilka', 'voltmeter', 'žica'],
    theory: ['Voltmeter se veže vzporedno s svetilko. Prikazuje napetost na svetilki.']
  },
  {
    prompt: 'Sestavi krog z dvema baterijama, dvema uporoma in svetilko.',
    requiredComponents: ['baterija', 'baterija', 'upor', 'upor', 'svetilka', 'žica'],
    theory: ['Več baterij pomeni večjo napetost, več uporov pa večjo skupno upornost.']
  }
];
