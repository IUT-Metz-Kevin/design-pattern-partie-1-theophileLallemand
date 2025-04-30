interface State {
    name: string;
    attack(): void;
    move(): void;
    jump(): void;
    stun(duration: number): void;
  }
  
  class Character {
    private state: State;
  
    constructor(initialState: State) {
      this.state = initialState;
    }
  
    setState(state: State):void {
      console.log(` Passage à l'état : ${state.name}`);
      this.state = state;
    }
  
    attack():void {
      this.state.attack();
    }
  
    move():void {
      this.state.move();
    }
  
    jump():void {
      this.state.jump();
    }
  
    stun(duration: number):void {
      this.state.stun(duration);
    }
  }
  
  // --- États concrets ---
  
  class IdleState implements State {
    name = 'Idle';
    constructor(private character: Character) {}
  
    attack(): void {
      this.character.setState(new AttackState(this.character));
    }
  
    move(): void {
      this.character.setState(new MoveState(this.character));
    }
  
    jump(): void {
      this.character.setState(new JumpState(this.character));
    }
  
    stun(duration: number): void {
      this.character.setState(new StunnedState(this.character, duration));
    }
  }
  
  class AttackState implements State {
    name = 'Attack';
    constructor(private character: Character) {}
  
    attack(): void {
      console.log("Continue d'attaquer !");
    }
  
    move(): void {
      console.log("Impossible de se déplacer pendant une attaque.");
    }
  
    jump(): void {
      console.log("Impossible de sauter pendant une attaque.");
    }
  
    stun(duration: number): void {
      this.character.setState(new StunnedState(this.character, duration));
    }
  }
  
  class MoveState implements State {
    name = 'Move';
    constructor(private character: Character) {}
  
    attack(): void {
      this.character.setState(new AttackState(this.character));
    }
  
    move(): void {
      console.log("🚶 Déjà en déplacement.");
    }
  
    jump(): void {
      this.character.setState(new JumpState(this.character));
    }
  
    stun(duration: number): void {
      this.character.setState(new StunnedState(this.character, duration));
    }
  }
  
  class JumpState implements State {
    name = 'Jump';
    constructor(private character: Character) {}
  
    attack(): void {
      this.character.setState(new AttackState(this.character));
    }
  
    move(): void {
      console.log(" Impossible de bouger en plein saut.");
    }
  
    jump(): void {
      console.log(" Déjà en train de sauter.");
    }
  
    stun(duration: number): void {
      this.character.setState(new StunnedState(this.character, duration));
    }
  }
  
  class StunnedState implements State {
    name = 'Stunned';
    constructor(private character: Character, private duration: number) {
      console.log(` Étourdi pendant ${duration} secondes.`);
      setTimeout(() => {
        console.log(" Fin de l'étourdissement.");
        this.character.setState(new IdleState(this.character));
      }, duration * 1000);
    }
  
    attack(): void {
      console.log(" Étourdi : impossible d'attaquer.");
    }
  
    move(): void {
      console.log(" Étourdi : impossible de bouger.");
    }
  
    jump(): void {
      console.log(" Étourdi : impossible de sauter.");
    }
  
    stun(duration: number): void {
      console.log(" Déjà étourdi.");
    }
  }
  
  // --- Simulation ---
  
  const hero = new Character({} as State);  // Initialisation temporaire
  const idle = new IdleState(hero);
  hero.setState(idle);
  
  // Déroulement fictif
  hero.move();    //  Move
  hero.jump();    //  Jump
  hero.attack();  //  Attack
  hero.stun(3);   //  Stunned
  
  // Test enchaîné (après étourdissement, retour à Idle)
  setTimeout(() => {
    hero.move();  // devrait marcher après le stun
  }, 4000);
  