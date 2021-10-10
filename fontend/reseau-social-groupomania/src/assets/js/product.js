class Camera{
    constructor(cameraData){
        this.id = cameraData._id;
        this.title = cameraData.title;
        this.description = cameraData.description;
        this.imageUrl = cameraData.imageUrl;
        this.price = cameraData.price;
    }
};