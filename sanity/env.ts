export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-07-12";

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET",
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID",
);

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}

//TODOS:
// delete contact
// chagne contacts into about us
// change logo
// make header smaller
// header drops down
// recordings
// cleanup english names
// handle better typing and break into type files
// clean tailwind stuff
// check images compression
// client review for dates in seminar speaker slug
// clean public folder
// break main components code into folders
// see nav when scrolled
// speaker card portable text
// header goes down with code
// registre for semianr
// Make speaker slug better
// Register button
// move toast copy to helpers
// contact also statically generated
// delete bg seminar slug
// dropdown header
// header size
// pagination
// max width header
// smaller footer
// seminars in speaker slug below
// speakers row col in seminar
// newsletter card add choose for seminar or jew
// icon in browser
// які тематичін розслилоки ви хочете отримувати
// Skeletons
// юристи бухгалера будівнитцо земля
// окремо семінар newsletter
// better ui and more features in newsletter
// smaller text in newsletter field
// add newsletter field to contact page
// color header
// register send email
// send email to sp urk net about registration
// fix all that ai slop in tools etc
// add tests
// archive to main page addon

// docker exec -it seminary-fop-postgres-1 psql "postgresql://user:password@localhost:5432/seminars-db"
