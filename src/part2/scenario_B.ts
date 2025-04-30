// Interface Médiateur
interface Mediator {
    demanderAtterrissage(avion: Avion): void;
    demanderDecollage(avion: Avion): void;
  }
  
  // Classe Avion
  class Avion {
    constructor(public id: string, private tour: Mediator) {}
  
    atterrir(): void {
      console.log(`Avion ${this.id} demande à atterrir.`);
      this.tour.demanderAtterrissage(this);
    }
  
    decoller(): void {
      console.log(`Avion ${this.id} demande à décoller.`);
      this.tour.demanderDecollage(this);
    }
  }
  
  // Classe Piste
  class Piste {
    constructor(public id: number, public libre: boolean = true) {}
  
    occuper(): void {
      this.libre = false;
    }
  
    liberer(): void {
      this.libre = true;
    }
  }
  
  // Classe TourDeControle (Médiateur)
  class TourDeControle implements Mediator {
    private pistes: Piste[];
  
    constructor(pistes: Piste[]) {
      this.pistes = pistes;
    }
  
    private trouverPisteLibre(): Piste | null {
      return this.pistes.find(p => p.libre) || null;
    }
  
    public demanderAtterrissage(avion: Avion): void {
      const piste = this.trouverPisteLibre();
      if (piste) {
        console.log(`Avion ${avion.id} autorisé à atterrir sur la piste ${piste.id}.`);
        piste.occuper();
      } else {
        console.log(`Aucune piste libre pour l'atterrissage de l'avion ${avion.id}.`);
      }
    }
  
    public demanderDecollage(avion: Avion): void {
      const piste = this.trouverPisteLibre();
      if (piste) {
        console.log(`Avion ${avion.id} autorisé à décoller depuis la piste ${piste.id}.`);
        piste.occuper();
  
        setTimeout((): void => {
          piste.liberer();
          console.log(`Avion ${avion.id} a décollé, piste ${piste.id} libérée.`);
        }, 2000);
      } else {
        console.log(`Aucune piste libre pour le décollage de l'avion ${avion.id}.`);
      }
    }
  }
  

  // Initialisation
const pistes: Piste[] = [new Piste(1), new Piste(2)];
const tour: TourDeControle = new TourDeControle(pistes);

// Création des avions
const avionA: Avion = new Avion("A", tour);
const avionB: Avion = new Avion("B", tour);
const avionC: Avion = new Avion("C", tour);

// Simulation
avionA.atterrir(); // Piste 1
avionB.atterrir(); // Piste 2
avionC.atterrir(); // Aucune piste libre

setTimeout((): void => {
  pistes[0].liberer(); // Libération manuelle pour test
  avionC.atterrir();   // Devrait maintenant réussir
}, 3000);
