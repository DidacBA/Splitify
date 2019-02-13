

const passwordControl = (req, res, next) => {
  const { password } = req.body;

  const special = /\W|_/g; // special characters and spaces
  const specialChar = password.match(special);

  const lowerCase = /[a-z]/g;
  const lowerCaseLetter = password.match(lowerCase);

  const numbers = /[0-9]/g;
  const numberInclude = password.match(numbers);
  const capital = /[A-Z]/g;
  const capitalLetter = password.match(capital);


  if (
    password.length >= 8
    && capitalLetter.length > 0
    && numberInclude.length > 0
    && lowerCaseLetter.length > 0
    && specialChar === null
  ) {
    next();
  } else {
    req.flash(
      'warning',
      'Your password must contain a minumum of 8 characters, at least one number, at least one capital & lowercase letter and no special characters or spaces. ',
    );
    res.redirect('/signup');
  }
};

module.exports = passwordControl;
