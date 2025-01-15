function validateFileName(fileName) {
  // Regular expression to match valid file names
  const validNamePattern = /^[a-zA-Z0-9-_]+\.[a-zA-Z0-9]+$/;

  // Test the file name against the pattern
  if (validNamePattern.test(fileName)) {
    return { valid: true };
  } else {
    return {
      valid: false,
      errorMessage:
        "Invalid file name. Use letters, numbers, dashes, or underscores, and avoid spaces or special characters.",
    };
  }
}

export default validateFileName;
