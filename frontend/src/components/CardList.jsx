import Card from "./Card.jsx";

const CardList = () => {
  const urls = [
    {
      longUrl:
        "https://www.example.com/articles/technology/artificial-intelligence-overview",
      shortUrl: "https://ex.am/ai",
    },
    {
      longUrl:
        "https://www.example.com/products/electronics/laptops/gaming-laptop-2026",
      shortUrl: "https://ex.am/gl26",
    },
    {
      longUrl:
        "https://www.example.com/blog/travel/top-10-places-to-visit-in-nepal",
      shortUrl: "https://ex.am/nepal10",
    },
    {
      longUrl:
        "https://www.example.com/news/world/global-economic-outlook-2026",
      shortUrl: "https://ex.am/econ26",
    },
    {
      longUrl: "https://www.example.com/recipes/healthy/vegan-quinoa-salad",
      shortUrl: "https://ex.am/quinoa",
    },
    {
      longUrl:
        "https://www.example.com/tutorials/programming/javascript/async-await-guide",
      shortUrl: "https://ex.am/jsasync",
    },
    {
      longUrl:
        "https://www.example.com/music/album-reviews/top-rock-albums-2026",
      shortUrl: "https://ex.am/rock26",
    },
    {
      longUrl:
        "https://www.example.com/sports/football/world-cup-2026-schedule",
      shortUrl: "https://ex.am/wc26",
    },
    {
      longUrl:
        "https://www.example.com/education/resources/mathematics/calculus-basics",
      shortUrl: "https://ex.am/calc",
    },
    {
      longUrl:
        "https://www.example.com/movies/reviews/sci-fi/best-sci-fi-movies-2026",
      shortUrl: "https://ex.am/scifi26",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {urls.map((item) => (
        <Card {...item} />
      ))}
    </div>
  );
};

export default CardList;
