const capitalizeEachLetter = (word) => {
    const arr = word.toLowerCase().split(" ");
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    console.log(arr.join(" "))
    return arr.join(" ");   
  }


export default capitalizeEachLetter