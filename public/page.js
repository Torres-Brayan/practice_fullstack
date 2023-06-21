async function getData() {
    try {
      const link = "localhost:8000/todos/";
      const result = await fetch(link, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
      });
      const data = await result.json();
      console.log(data)
    } catch (err) {
      console.log(err);
    }
  }

  getData();