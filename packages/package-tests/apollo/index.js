// eslint-disable-next-line @typescript-eslint/no-var-requires
const neo4j = require("neo4j-driver");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const server = require("./server");

const driver = neo4j.driver("neo4j://localhost:7687", neo4j.auth.basic("admin", "password"));

const typeDefs = `
type Movie {
    title: String
    year: Int
    imdbRating: Float
    genres: [Genre] @relationship(type: "IN_GENRE", direction: "OUT")
}

type Genre {
    name: String
    movies: [Movie] @relationship(type: "IN_GENRE", direction: "IN")
}`;

function main() {
    server.start(typeDefs, driver);
}

main();