export function getProjectTypeLabel(projectType) {
  switch (projectType) {
    case "loft":
      return "Loft conversion";
    case "extension":
      return "House extension";
    case "garden":
      return "Garden room";
    case "kitchen":
      return "Kitchen renovation";
    default:
      return projectType;
  }
}

export function getSizeLabel(size) {
  switch (size) {
    case "small":
      return "Small";
    case "medium":
      return "Medium";
    case "large":
      return "Large";
    default:
      return size;
  }
}

export function getFinishLabel(finish) {
  switch (finish) {
    case "basic":
      return "Basic";
    case "standard":
      return "Standard";
    case "premium":
      return "Premium";
    default:
      return finish;
  }
}
