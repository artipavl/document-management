type ObjectWithUndefined = {
    [key: string]: any | undefined;
  };

function removeUndefinedValues<T extends ObjectWithUndefined>(
    obj: T
  ): Partial<T> {
    const result: Partial<T> = {};
  
    for (const key in obj) {
      if (obj[key]) {
        result[key] = obj[key];
      }
    }
  
    return result;
  }

  export default removeUndefinedValues