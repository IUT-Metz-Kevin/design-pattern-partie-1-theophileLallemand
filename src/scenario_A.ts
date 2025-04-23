interface GameplaySettings {
    difficulty: string;
    language: string;
  }
  
  interface AudioSettings {
    musicVolume: number;
    sfxVolume: number;
  }
  
  interface GraphicsSettings {
    resolution: string;
    quality: string;
  }
  
  class GameSettingsManager {
    private static instance: GameSettingsManager;
  
    private gameplaySettings: GameplaySettings;
    private audioSettings: AudioSettings;
    private graphicsSettings: GraphicsSettings;
  
    private constructor() {
      this.gameplaySettings = { difficulty: 'Normal', language: 'Français' };
      this.audioSettings = { musicVolume: 50, sfxVolume: 50 };
      this.graphicsSettings = { resolution: '1080p', quality: 'Moyen' };
    }
  
    public static getInstance(): GameSettingsManager {
      if (!GameSettingsManager.instance) {
        GameSettingsManager.instance = new GameSettingsManager();
      }
      return GameSettingsManager.instance;
    }
  
    // --- Gameplay ---
    public setDifficulty(level: string): void {
      const allowed = ['Facile', 'Normal', 'Difficile'];
      if (allowed.includes(level)) {
        this.gameplaySettings.difficulty = level;
      } else {
        console.warn(`Difficulté invalide : ${level}`);
      }
    }
  
    public setLanguage(lang: string): void {
      const allowed = ['Français', 'Anglais', 'Espagnol'];
      if (allowed.includes(lang)) {
        this.gameplaySettings.language = lang;
      } else {
        console.warn(`Langue invalide : ${lang}`);
      }
    }
  
    public getGameplaySettings(): GameplaySettings {
      return this.gameplaySettings;
    }
  
    // --- Audio ---
    public setMusicVolume(volume: number): void {
      this.audioSettings.musicVolume = this.clampVolume(volume);
    }
  
    public setSfxVolume(volume: number): void {
      this.audioSettings.sfxVolume = this.clampVolume(volume);
    }
  
    public getAudioSettings(): AudioSettings {
      return this.audioSettings;
    }
  
    // --- Graphiques ---
    public setResolution(res: string): void {
      const allowed = ['720p', '1080p', '4K'];
      if (allowed.includes(res)) {
        this.graphicsSettings.resolution = res;
      } else {
        console.warn(`Résolution invalide : ${res}`);
      }
    }
  
    public setGraphicQuality(quality: string): void {
      const allowed = ['Bas', 'Moyen', 'Élevé'];
      if (allowed.includes(quality)) {
        this.graphicsSettings.quality = quality;
      } else {
        console.warn(`Qualité graphique invalide : ${quality}`);
      }
    }
  
    public getGraphicsSettings(): GraphicsSettings {
      return this.graphicsSettings;
    }
  
    private clampVolume(volume: number): number {
      return Math.max(0, Math.min(100, volume));
    }
  }
  
  // --- Exemple d’utilisation ---
  const settings = GameSettingsManager.getInstance();
  settings.setDifficulty('Difficile');
  settings.setLanguage('Anglais');
  settings.setMusicVolume(70);
  settings.setResolution('4K');
  settings.setGraphicQuality('Élevé');
  
  console.log('Paramètres du jeu :', {
    gameplay: settings.getGameplaySettings(),
    audio: settings.getAudioSettings(),
    graphiques: settings.getGraphicsSettings(),
  });
  