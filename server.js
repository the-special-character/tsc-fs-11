function fn() {
  try {
    const a = 1;

    a = 2;
  } catch (error) {
    console.log(error);
  }
}

fn();
