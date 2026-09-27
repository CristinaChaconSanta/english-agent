import { Fragment } from "react";
import type { Lesson } from "@/lib/schemas/lesson";

const HEAD = ["Verb", "Base", "Past", "Past participle", "-ing", "3rd person", "Tenses it appears in", "Example"];
const CELL = "border-[2px] border-current px-2 py-2 align-top";

export function VerbTable({ verbs }: { verbs: Lesson["verbList"] }) {
  return (
    <div className="-mx-2 mt-3 overflow-x-auto px-2" role="region" aria-label="Verb list table" tabIndex={0}>
      <table className="min-w-[1040px] border-collapse text-left text-[15px]">
        <thead>
          <tr>
            {HEAD.map((label) => (
              <th key={label} scope="col" className={`${CELL} font-display`}>
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {verbs.map((verb) => (
            <Fragment key={verb.verb}>
              {verb.meanings.map((meaning, index) => (
                <tr key={`${verb.verb}-${meaning.meaning}`}>
                  {index === 0 ? (
                    <>
                      <th scope="row" rowSpan={verb.meanings.length} className={`${CELL} font-display text-lg`}>
                        {verb.verb}
                      </th>
                      {[verb.base, verb.past, verb.pastParticiple, verb.ing, verb.thirdPerson].map((form, formIndex) => (
                        <td key={`${HEAD[formIndex + 1]}`} rowSpan={verb.meanings.length} className={CELL}>
                          {form}
                        </td>
                      ))}
                    </>
                  ) : null}
                  <td className={`${CELL} min-w-[150px]`}>{meaning.tenses.join(", ")}</td>
                  <td className={`${CELL} min-w-[300px]`}>
                    <span className="font-semibold">{meaning.meaning}:</span> {meaning.example}
                  </td>
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
