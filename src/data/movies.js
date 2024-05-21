//list of mock data movies
export const movies = [{
    id: 1,
    //_id: ObjectId('663a4446f5fc80b9c0e00d8c'),
    title: 'The Dark Knight',
    description: 'The Dark Knight is a superhero film directed by Christopher Nolan. It follows the story of Batman as he faces off against his greatest adversary, the Joker, who unleashes chaos and destruction upon Gotham City. With its gripping plot, intense action sequences, and standout performances, The Dark Knight is widely regarded as one of the greatest superhero films of all time.',
    genre: {
      name: 'Action',
      description: 'Action films are works of fiction that emphasize fast-paced action, thrilling stunts, and exciting sequences. These films often feature heroic protagonists facing off against formidable adversaries, engaging viewers with adrenaline-fueled entertainment and suspenseful storytelling.'
    },
    director: {
      name: 'Christopher Nolan',
      description: "Christopher Nolan is a British-American film director, screenwriter, and producer. He is known for his innovative storytelling, intricate plots, and visually stunning cinematography. Nolan's films often explore themes of identity, time, and morality, captivating audiences with their complexity and depth.",
      //birthyear: ISODate('1970-07-30T00:00:00.000Z'),
      //deathyear: ISODate('1970-01-01T00:00:00.000Z')
    },
    ranking: 4,
    imgUrl: 'https://ew.com/thmb/B0w9qzmQqCZ1tumxv8cBx0aPTrQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/mcddakn_ec005-2000-a3d30c1958fb442486fb1e10ba92dd17.jpg'
  },
  {
    id: 2,
    //_id: ObjectId('663a4446f5fc80b9c0e00d8b'),
    title: 'The Godfather',
    description: 'The Godfather is a classic crime drama film directed by Francis Ford Coppola. It tells the story of the Corleone family, a powerful Mafia clan, and their struggles to maintain their empire amidst betrayal, violence, and family conflict. With its iconic performances, gripping storyline, and unforgettable scenes, The Godfather has become one of the most acclaimed films in cinematic history.',
    genre: {
      name: 'Crime',
      description: 'Crime films are works of fiction that revolve around criminal activities, law enforcement, and the criminal justice system. These films often explore themes of morality, power, and justice, drawing viewers into the world of crime and its consequences.'
    },
    director: {
      name: 'Francis Ford Coppola',
      description: "Francis Ford Coppola is an American film director, producer, and screenwriter. He is best known for directing The Godfather trilogy, Apocalypse Now, and The Conversation. Coppola's films often explore themes of power, corruption, and the human condition.",
      //birthyear: ISODate('1939-04-07T00:00:00.000Z'),
      //deathyear: ISODate('1970-01-01T00:00:00.000Z')
    },
    ranking: 5,
    imgUrl: 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg'
  },
  {
    id: 3,
    //_id: ObjectId('663a4446f5fc80b9c0e00d90'),
    title: 'Pulp Fiction',
    description: 'Pulp Fiction is a genre-defying crime film directed by Quentin Tarantino. It weaves together multiple interconnected storylines involving crime, violence, and redemption, set against the backdrop of Los Angeles. With its nonlinear narrative, memorable characters, and witty dialogue, Pulp Fiction is hailed as a masterpiece of contemporary cinema.',
    genre: {
      name: 'Crime',
      description: 'Crime films are works of fiction that revolve around criminal activities, law enforcement, and the criminal justice system. These films often explore themes of morality, power, and justice, drawing viewers into the world of crime and its consequences.'
    },
    director: {
      name: 'Quentin Tarantino',
      description: "Quentin Tarantino is an American filmmaker known for his distinctive style and unconventional storytelling techniques. He rose to fame with films like Reservoir Dogs, Pulp Fiction, and Kill Bill. Tarantino's films often feature nonlinear narratives, sharp dialogue, and a mix of humor and violence.",
      //birthyear: ISODate('1963-03-27T00:00:00.000Z'),
      //deathyear: ISODate('1970-01-01T00:00:00.000Z')
    },
    ranking: '4',
    imgUrl: 'https://www.miramax.com/assets/Pulp-Fiction1.png'
  }
]