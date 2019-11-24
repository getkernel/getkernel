/**
 * Utility methods for sorting arrays of data.
 */
export default class Compare {
  /**
   * String compare function.
   * @param {String} order Compare order (asc|desc).
   * asc by default.
   * @param {String} alwaysOnTop Item to keep on top of the list.
   */
  static string(order = 'asc', alwaysOnTop = null) {
    const sort = {
      asc: function(a, b) {
        const valueA = String(a).toLowerCase();
        const valueB = String(b).toLowerCase();

        if (alwaysOnTop) {
          if (valueA.includes(alwaysOnTop) || valueB.includes(alwaysOnTop)) {
            return 1;
          }
        }

        if (valueA > valueB) return 1;
        if (valueA < valueB) return -1;
        return 0;
      },
      desc: function(a, b) {
        return sort.asc(b, a);
      },
    };

    return (a, b) => sort[order](a, b);
  }

  /**
   * Sorts objects by property name.
   * @param {String} propName Property name to sort by.
   * @param {String} order Compare order (asc|desc).
   * asc by default.
   * @param {String} alwaysOnTop Item to keep on top of the list.
   */
  static prop(propName, order = 'asc', alwaysOnTop = null) {
    return (a, b) =>
      Compare.string(order, alwaysOnTop)(a[propName], b[propName]);
  }

  /**
   * Comperator function for sorting Version objects.
   * @param {String} order Compare order (asc|desc).
   * asc by default.
   */
  static version(order = 'asc') {
    const props = ['major', 'minor', 'patch', 'rc', 'distro'];

    const sort = {
      asc: function(verA, verB) {
        for (let i = 0; i < props.length; i++) {
          const a = verA[props[i]];
          const b = verB[props[i]];
          if (a && b) {
            if (typeof a === 'number' && typeof b === 'number') {
              if (a > b) return 1;
              if (a < b) return -1;
              continue;
            } else {
              return Compare.string(order)(a, b);
            }
          }
          if (a) return 1;
          if (b) return -1;
        }
        return 0;
      },
      desc: function(verA, verB) {
        return sort.asc(verB, verA);
      },
    };

    return (a, b) => sort[order](a, b);
  }
}
