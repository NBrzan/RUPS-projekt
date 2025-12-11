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
    prompt: 'Sestavi električni krog s svetilko in uporom. Spremeni upornost upora in opazuj, kaj se dogaja s svetilko.',
    requiredComponents: ['baterija', 'svetilka', 'žica', 'upor'],
    theory: ['Upor omejuje tok v krogu. Večji kot je upor, manjši je tok. Spoznajmo Ohmov zakon: tok (I) = napetost (U) / upornost (R). Svetilka bo svetila manj intenzivno, saj skozi njo teče manjši tok.']
  }
];

export const highSchoolChallenges = [
  //{
  //  prompt: 'Sestavi električni krog z dvema uporoma in izračunaj skupno upornost.',
  //  requiredComponents: ['baterija', 'upor', 'upor', 'žica'],
  //  theory: ['Upora sta vezana zaporedno. Skupna upornost je vsota posameznih uporov: R_total = R1 + R2.']
  //},
  {
    prompt: 'Sestavi električni krog z 5V baterijo.',
    requiredComponents: ['baterija', 'upor', 'svetilka', 'žica'],
    theory: ['Upora sta vezana zaporedno. Skupna upornost je vsota posameznih uporov: R_total = R1 + R2. V našem primeru je skupna upornost 50 Ohm.'],
        checkFn: (scene) => {
      const batteries = scene.placedComponents.filter(c => c.getData('type') === 'baterija');

      const batteryVoltages = batteries.map(b => b.getData('logicComponent').voltage);

      const fiveV = batteryVoltages.find(v => Math.abs(v - 5) < 0.01);      
        console.log("battery 5v:",fiveV);
      return fiveV;
    }
  },
    {
      prompt: 'Sestavi krog z dvema baterijama. Ena baterija naj ima napetost 3.3V, druga pa 5V.',
      requiredComponents: ['baterija', 'baterija', 'upor', 'upor', 'svetilka', 'žica'],
      theory: ['Več baterij pomeni večjo napetost, več uporov pa večjo skupno upornost. Skupna napetost je 8.3V.'],
      checkFn: (scene) => {
        const batteries = scene.placedComponents.filter(c => c.getData('type') === 'baterija');
        const resistors = scene.placedComponents.filter(c => c.getData('type') === 'upor');
  
        if (batteries.length < 2) {
          return false;
        }
  
        const batteryVoltages = batteries.map(b => b.getData('logicComponent').voltage);
  
        const has3_3V = batteryVoltages.find(v => Math.abs(v - 3.3) < 0.01);
        const has5V = batteryVoltages.find(v => Math.abs(v - 5) < 0.01);

        return has3_3V && has5V;
      }
    },
    {
      prompt: 'Sestavi krog z 5V baterijo. Tok nastavi na 0.5V',
      requiredComponents: ['baterija', 'upor', 'svetilka', 'žica'],
      theory: [
        'Kadar se zmanjša tok, je za to odgovorna večja upornost v vezju. Po zakonu Ohma (I = V / R) se tok zmanjša, kadar se poveča upornost ali kadar se zmanjša napetost. '
      ],
      checkFn: (scene) => {
        const batteries = scene.placedComponents.filter(c => c.getData('type') === 'baterija');
  
        const batteryVoltages = batteries.map(b => b.getData('logicComponent').voltage);
        const has5V = batteryVoltages.find(v => Math.abs(v - 5) < 0.01);

        return has5V;
      }
    },
];