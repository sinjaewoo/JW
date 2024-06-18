class GameOver extends Phaser.Scene{

    constructor(){  
        super({key:"GameOver"});
    }

    preload(){  

    }

    create(){   
        
        this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 - 30, "Game Over", {
            fontSize : "50px",
            fill : "#FF0000"
        }).setOrigin(0.5);

        let restartBtn = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 + 50, "Restart",{
            fontSize : "35px",
            fill : "#FF0000"
        }).setOrigin(0.5).setInteractive();

        restartBtn.on("pointerdown", () => {
            this.scene.start("Exam02");
        })

        restartBtn.on("pointerover", () => {
            restartBtn.setBackgroundColor("#0000FF");
            this.game.canvas.style.cursor = "pointer";
        })

        restartBtn.on("pointerout", () => {
            restartBtn.setBackgroundColor("#000000");
            this.game.canvas.style.cursor = "default";
        })

    }

    update(){   

    }
}