/**
 * Decodes a string of data which has been encoded using base-64 encoding.
 * @param {String} encodedData The base-64 encoded string to decode.
 */
function atob(encodedData) {
  return Buffer.from(encodedData, 'base64').toString('binary');
}

/**
 * Creates a base-64 encoded ASCII string from a "string" of binary data.
 * @param {String} stringToEncode The binary string to encode.
 */
function btoa(stringToEncode) {
  var buffer;

  if (stringToEncode instanceof Buffer) {
    buffer = stringToEncode;
  } else {
    buffer = Buffer.from(stringToEncode.toString(), 'binary');
  }

  return buffer.toString('base64');
}

module.exports = { atob, btoa };
