window.onload = () => {
  const boardSize = 800;

  // Get reference to canvasnp
  const canvas = <HTMLCanvasElement>document.getElementById('canvas');
  canvas.width = canvas.height = boardSize;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgba(0, 0, 0, 1)';

  // Call 'draw' function whenever browser renders a frame on the screen
  window.requestAnimationFrame(initialDraw);
  window.requestAnimationFrame(draw);

  function initialDraw() {
    for (let hor : number = 0; hor < boardSize; hor = hor + 4){
      for (let ver: number = 0; ver < boardSize; ver = ver + 4){
        if (Math.floor(Math.random() * 99) == 0){
          ctx.fillRect(hor, ver, 4, 4);
        }
      }
    }
  }

  function draw() {
    let alive : boolean = true;
    let count : number = 0;
    while (alive == true){
      alive = false;
      for (let hor : number = 0; hor < boardSize; hor = hor + 4){
        for (let ver: number = 0; ver < boardSize; ver = ver + 4){
          let count: number = getSurrounding(hor, ver);
          let field: Uint8ClampedArray = ctx.getImageData(hor, ver, 1, 1).data;
          if (field[3] == 0 && count == 3){
            ctx.fillRect(hor, ver, 4, 4);
          }else if (field[3] != 0){
            if (count < 2){
              ctx.fillStyle = 'rgba(0, 0, 0, 0)';
              ctx.fillRect(hor, ver, 4, 4);
              ctx.fillStyle = 'rgba(0, 0, 0, 1)';
            }else if (count > 3){
              ctx.fillStyle = 'rgba(0, 0, 0, 0)';
              ctx.fillRect(hor, ver, 4, 4);
              ctx.fillStyle = 'rgba(0, 0, 0, 1)';
            }
          }
        }
      }
      count++;
      if (count == 1) alive = false;
    }
  }

  function getSurrounding(hor: number, ver: number){
    let count: number = 0;
    for (let checkHor : number = hor - 4; checkHor < hor + 8; checkHor = checkHor + 4){
      for (let checkVer: number = ver - 4; checkVer < ver + 8; checkVer = checkVer + 4){
        if (checkHor >= 0 && checkHor <= boardSize && checkVer >= 0 && checkVer <= boardSize){
          if (checkHor != hor || checkVer != ver){
            let field: Uint8ClampedArray = ctx.getImageData(checkHor, checkVer, 1, 1).data;
            if (field[3] != 0){
              count++;
            }
          }
        }
      }
    }
    return count;
  }
};