export function getArena(level) {
  switch (level) {
    case 1: {
      return {
        required_point_level_up: 1000,
        level_up_to: 2,
        value_level: 10,
      };
    }
    case 2: {
      return {
        required_point_level_up: 2000,
        level_up_to: 3,
        value_level: 20,
      };
    }
    case 3: {
      return {
        required_point_level_up: 3000,
        level_up_to: 4,
        value_level: 30,
      };
    }
    case 4: {
      return {
        required_point_level_up: 4000,
        level_up_to: 5,
        value_level: 40,
      };
    }
    case 5: {
      return {
        required_point_level_up: 5000,
        value_level: 50,
      };
    }
  }
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
