import { defineMigration, del } from "sanity/migrate";

export default defineMigration({
  title: "Delete all seminars",
  documentTypes: ["seminar"],
  filter: '_type == "seminar"',

  migrate: {
    document(doc) {
      return del(doc._id);
    },
  },
});
//npx sanity migration run deleteSeminar --no-dry-run
