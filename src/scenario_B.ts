abstract class OrganisationComponent {
    constructor(protected name: string) {}
  
    abstract afficher(indent?: string): void;
  }
  
  // Feuille (Leaf) : Employé
  class Employe extends OrganisationComponent {
    constructor(name: string) {
      super(name);
    }
  
    afficher(indent: string = ''): void {
      console.log(`${indent}- Employé : ${this.name}`);
    }
  }

  class Departement extends OrganisationComponent {
    private enfants: OrganisationComponent[] = [];
  
    constructor(name: string) {
      super(name);
    }
  
    ajouter(component: OrganisationComponent): void {
      this.enfants.push(component);
    }
  
    afficher(indent: string = ''): void {
      console.log(`${indent}+ Département : ${this.name}`);
      for (const enfant of this.enfants) {
        enfant.afficher(indent + '  ');
      }
    }
  }
  