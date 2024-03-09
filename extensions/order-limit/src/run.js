// @ts-check

/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 */

/**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */
export function run({ cart }) {
  const errors = [];
  const lines = cart.lines;

  lines.forEach((line) => {
    const lineLimit = line.merchandise?.variant_order_limit?.value;
    const lineProductTitle = line.merchandise?.product?.title;
    const lineVariantTitle = line.merchandise?.title;
    const error = {
      localizedMessage: `Dev - Not possible to order more than ${lineLimit} of ${lineProductTitle}${
        lineVariantTitle ? ` (${lineVariantTitle})` : ""
      }`,
      target: "cart",
    };

    if (line.quantity > lineLimit) {
      errors.push(error);
    }
  });

  // const errors = cart.lines
  //   .filter(({ quantity }) => {
  //     return quantity > 1;
  //   })
  //   .map(() => ({
  //     localizedMessage: "Not possible to order more than 1",
  //     target: "cart",
  //   }));

  return {
    errors,
  };
}
