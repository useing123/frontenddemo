<template>
  <div class="bg-current p-4 rounded-lg shadow-md">
    <h2 class="text-xl font-bold mb-2">Anime Trivia</h2>
    <p>{{ trivia }}</p>
    <button
      class="mt-4 bg-blue-500 text-white px-2 py-1 rounded"
      @click="getRandomTrivia"
    >
      Another Trivia
    </button>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      triviaList: [
        "Kazakhstan is the world's largest landlocked country.",
        "Astana, the capital of Kazakhstan, was a small town until 1997.",
        "Kazakhstan was the last of the Soviet republics to declare independence.",
        "Astana is one of the youngest capitals in the world.",
        "Kazakhstan has the spaceport, Baikonur Cosmodrome, leased to Russia until 2050.",
        "The horse meat is a large part of Kazakh cuisine.",
        "Apple originated from Kazakhstan; the country's former capital Almaty means 'father of apples'.",
        "Kazakhstan is one of the most multinational countries in the world with over 130 ethnic groups.",
        "'Naruto' was originally a manga before being adapted into an anime.",
        "'Pokémon' is the highest-grossing media franchise of all time.",
        "Manga in Japan is read by people of all ages, not just children or teenagers.",
        "The first anime, a two-minute clip of a samurai warrior, was created over a hundred years ago.",
        "In manga, characters' hair isn't just for looks — its style, color, and length often signify the character's personality and role in the story.",
        "'Gundam' is one of the most influential anime series and has contributed significantly to the popularity of mecha in anime.",
        "'Sailor Moon' was a major breakthrough for the 'magical girl' genre and has been influential worldwide.",
        "Many elements of the 'Dragon Ball' series were inspired by the classic Chinese novel 'Journey to the West'.",
        "Katsuhiro Otomo's 'Akira' is considered a landmark in Japanese animation and has influenced numerous works in animation, comics, film, music, television and video games.",
        "Hideaki Anno's 'Neon Genesis Evangelion' has had a significant impact on Japanese pop culture and has been credited with revitalizing the anime industry in the late 1990s.",
        "'Death Note' features complex psychological and moral themes, and it's popular among both anime and manga fans.",
        "Studio Ghibli is often compared to Disney, but its films often tackle more complex themes and are aimed at a wide range of ages.",
        "'Ghost in the Shell' influenced a number of popular films, including 'The Matrix'.",
        "Kazakhstan's traditional drink, kumis, is made of fermented mare's milk.",
        "Kazakhstan is home to a space launch site, Baikonur Cosmodrome, which was originally built by the Soviet Union.",
        "The name 'Kazakhstan' translates to 'Land of the Wanderers'.",
        "Kazakhstan is known for its diverse wildlife, which includes snow leopards and wolves.",
        "Astana, the capital of Kazakhstan, was known as Akmola until 1998, when it was renamed to Astana, meaning 'the capital' in Kazakh. It was again renamed to Nur-Sultan in 2019.",
        "The 'One Piece' manga by Eiichiro Oda has the highest number of volumes published for a single manga series.",
        "Hayao Miyazaki does not allow his films to be edited for international release, after a bad experience with 'Nausicaä of the Valley of the Wind'.",
        "The 'Jojo's Bizarre Adventure' manga, known for its distinct art style and poses, has been running for over 30 years.",
        "The 'Mobile Suit Gundam' franchise is credited with pioneering the 'real robot' genre of mecha anime.",
        "Tetsuya Nomura, known for designing characters for the 'Final Fantasy' series, was also the character designer for 'Subarashiki Kono Sekai' (The World Ends with You).",
        "The film 'Spirited Away' was so successful that it even surpassed Titanic's box office earnings in Japan.",
        "'Attack on Titan' manga creator Hajime Isayama drew inspiration from his childhood fear of cannibalism.",
        "'Bleach' author Tite Kubo initially designed Rukia Kuchiki as the protagonist, but realized it would be better to have a human perspective, leading to the creation of Ichigo Kurosaki.",
        "Anime has its roots in early Japanese art, with some influences from Western animation styles.",
        "In 'Naruto', the characters' names are often inspired by Japanese folklore or have other cultural meanings.",
        "'Hunter x Hunter' has had multiple hiatuses, leading to the term 'Hiatus x Hiatus' among fans.",
        "The 'Neon Genesis Evangelion' series is known for its psychological depth and exploration of the impacts of war and conflict on its characters.",
        "In 'Bleach', the afterlife, Soul Society, is depicted as a form of samurai-era Japan.",
        "Many anime series, including 'My Hero Academia' and 'Attack on Titan', were first serialized in the 'Weekly Shōnen Jump' magazine.",
      ],

      trivia: "",
    };
  },
  methods: {
    getRandomTrivia() {
      const randomIndex = Math.floor(Math.random() * this.triviaList.length);
      this.trivia = this.triviaList[randomIndex];
    },
  },
  created() {
    this.getRandomTrivia();
  },
};
</script>
  
  <style scoped>
div {
  width: 100%;
}
</style>
  