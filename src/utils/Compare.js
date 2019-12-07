import moment from 'moment';

/**
 * Utility methods for sorting arrays of data.
 */
export default class Compare {
  /**
   * String compare function.
   * @param {('asc'|'desc')} order Compare order. Asc by default.
   * @param {String} alwaysOnTop Item to keep on top of the list.
   */
  static string(order = 'asc', alwaysOnTop = null) {
    const sort = {
      asc(a, b) {
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
      desc(a, b) {
        return sort.asc(b, a);
      },
    };
    return (a, b) => sort[order.toLowerCase()](a, b);
  }

  /**
   * Comperator function for sorting Version objects.
   * @param {('asc'|'desc')} order Compare order. Asc by default.
   */
  static version(order = 'asc') {
    const props = [
      'major',
      'minor',
      'build',
      'patch',
      'extra',
      'rc',
      'ckt',
      'distro',
    ];

    const sort = {
      asc(verA, verB) {
        for (let i = 0; i < props.length; i += 1) {
          const a = verA[props[i]];
          const b = verB[props[i]];
          if (a && b) {
            if (typeof a === 'number' && typeof b === 'number') {
              if (a > b) return 1;
              if (a < b) return -1;
              continue; // eslint-disable-line no-continue
            } else {
              return Compare.string(order)(a, b);
            }
          }
          if (a) return 1;
          if (b) return -1;
        }
        return 0;
      },
      desc(verA, verB) {
        return sort.asc(verB, verA);
      },
    };
    return (a, b) => sort[order.toLowerCase()](a, b);
  }

  /**
   * Comperator function for date objects.
   * @param {('asc'|'desc')} order Compare order. Asc by default.
   */
  static date(order = 'asc') {
    const sort = {
      asc(a, b) {
        return moment(a) - moment(b);
      },
      desc(a, b) {
        return sort.asc(b, a);
      },
    };
    return (a, b) => sort[order.toLowerCase()](a, b);
  }

  /**
   * Comperator function for ServerIndexObject objects.
   * @param {('asc'|'desc')} order Compare order. Asc by default.
   * @param {('date'|'name'|'versionName')} sortBy Sort entries by. Date by default.
   */
  static serverIndex(order = 'asc', sortBy = 'date') {
    const sort = {
      asc(a, b) {
        switch (sortBy.toLowerCase()) {
          default:
          case 'date':
            return Compare.date(order)(a.lastModified, b.lastModified);

          case 'name':
          case 'versionName':
            return Compare.string(order)(a.versionName, b.versionName);
        }
      },
      desc(a, b) {
        return sort.asc(b, a);
      },
    };
    return (a, b) => sort[order.toLowerCase()](a, b);
  }
}
