// import { Parser } from "hot-formula-parser";

export function parseAndCalculate(
  formula: string,
  context: Record<string, any>
) {
  // Clean the formula (e.g., replace `this.`)
  const parsedFormula = formula.replace(/this\./g, "");

  // Normalize context: convert numeric strings to numbers
  const normalizedContext: Record<string, any> = {};
  for (const key in context) {
    const value = context[key];
    if (!isNaN(value) && value !== null && value !== "") {
      normalizedContext[key] = Number(value);
    } else {
      normalizedContext[key] = value;
    }
  }

  try {
    // Build a function from keys and parsed formula
    const calculate = new Function(
      ...Object.keys(normalizedContext),
      `return ${parsedFormula};`
    );

    // Call the function with normalized values
    return calculate(...Object.values(normalizedContext));
  } catch (err) {
    console.error("Formula calculation error:", err);
    return "Error";
  }
}

// export function parseAndCalculate(formula: string, context: any) {
//   // Replace 'this.' with an empty string and evaluate the formula
//   const parsedFormula = formula.replace(/this\./g, "");

//   // Replace variables in the formula with their values from the context
//   const evaluatedFormula = parsedFormula.replace(/(\w+)/g, (match) => {
//     return context[match] !== undefined ? context[match] : match;
//   });
//   console.log(evaluatedFormula);

//   // Use eval to calculate the result
//   return eval(evaluatedFormula);
// }
