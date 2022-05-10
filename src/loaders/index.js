import expressLoader from './express';


let init = async (app)=>{
    await expressLoader.init(app);
}

export default {init};