exports.getbfhl = (req, res) => {
  res.json({ operation_code: 1 });
};

exports.add = (req, res) => {
  try {
    let data = req.body.data || [];

    if (!data) {
      res.status(200).json({
        is_success: false,
        user_id: process.env.USER_ID,
        email: process.env.EMAIL,
        roll_number: process.env.ROLL_NUMBER,
        numbers: [],
        alphabets: [],
        highest_lowercase_alphabet: [],
      });
    }

    const numbers = [];
    const alphabets = [];
    let highestLowercase = "";

    for (const element of data) {
      const item = element;

      if (!isNaN(Number(item)) && item.trim() !== "") {
        numbers.push(item);
      } else if (/^[A-Za-z]$/.test(item)) {
        alphabets.push(item);

        if (/[a-z]/.test(item)) {
          if (item > highestLowercase) {
            highestLowercase = item;
          }
        }
      }
    }

    res.status(200).json({
      is_success: true,
      user_id: process.env.USER_ID,
      email: process.env.EMAIL,
      roll_number: process.env.ROLL_NUMBER,
      numbers: numbers,
      alphabets: alphabets,
      highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
    });
  } catch (e) {
    res.json({ is_success: false, error: error.message });
  }
};
