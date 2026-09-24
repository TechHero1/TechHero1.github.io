export const SITE_COLORS = {
  "default": "#ffffff",
  "types": {
    "Novel": "#e6cff2",
    "Anime": "#bfe1f6",
    "Mangá": "#d4edbc",
    "Jogo": "#ffcfc9",
    "Filme": "#c6dbe1",
    "Áudio": "#ffc8aa",
    "Dorama/Série": "#fe3967",
    "Stage": "#efe80e",
    "Fanfic": "#a8a8a8",
    "Short Story": "#ce5add",
    "Ensaio": "#ffffff"
  },
  "status": {
    "Completo": "#4285f4",
    "Progredindo": "#00ff00",
    "Planejo": "#cfe2f3",
    "Abandonado": "#ff0000",
    "Repetindo": "#11734b",
    "Pausado": "#ffe5a0"
  }
};

export const STRINGS_BY_TYPE = {
  "singular": {
    "Novel": " capítulo",
    "Mangá": " capítulo",
    "Anime": " episódio",
    "Filme": " episódio",
    "Áudio": " episódio",
    "Dorama/Série": " episódio",
    "Stage": " episódio",
    "Personalizado": "",
  },
  "plural": {
    "Novel": " capítulos",
    "Mangá": " capítulos",
    "Anime": " episódios",
    "Filme": " episódios",
    "Áudio": " episódios",
    "Dorama/Série": " episódios",
    "Stage": " episódios",
    "Personalizado": "",
  },
  "volumes": ["Novel", "Mangá", "Personalizado"],
  "nada": ["Jogo", "Fanfic", "Short Story", "Ensaio"]
};

export const MEDIAS = {
  "types": ['Anime', 'Novel', 'Mangá', 'Jogo', 'Filme', 'Áudio', 'Dorama/Série', 'Stage', 'Fanfic', 'Short Story', 'Ensaio', 'Personalizado'],
  "status": ['Completo', 'Progredindo', 'Planejo', 'Abandonado', 'Repetindo', 'Pausado'],
};
