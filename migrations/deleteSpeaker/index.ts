import { defineMigration, del } from "sanity/migrate";

export default defineMigration({
  title: "Delete all seminars",
  documentTypes: ["speaker"],
  filter: '_type == "speaker"',

  migrate: {
    document(doc) {
      return del(doc._id);
    },
  },
});
//npx sanity migration run deleteSpeaker --no-dry-run
