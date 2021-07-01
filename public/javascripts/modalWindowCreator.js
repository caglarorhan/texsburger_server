const modalWindowCreator = ({id='test',width=500, height=500, unit='px', ingredient='This is a test modal!', display='none'}={})=>{
    if(document.getElementById(id)){
        return document.getElementById(id);
    }
let theModal = document.createElement('div');
theModal.id = id;
theModal.className='modal';
theModal.style.display = display;
document.body.append(theModal);
//
    let theModalContent = document.createElement('div');
    theModalContent.className='modal-content';
    theModalContent.style.cssText=`display:flex; flex-direction:column; align-items:center; width:${width}${unit}; height:${height}${unit}`;
    theModal.append(theModalContent);
    //
    window.addEventListener('click',(event)=>{
        if(event.target.id===id){
            theModal.switch('off')
        }
    })
    //
    theModalContent.innerHTML = ingredient;
    //
    theModal.switch=(position)=>{
        if(!position){
            theModal.style.display = (theModal.style.display==='none')?'block':'none';
        }else{
            theModal.style.display=(position==='on')?'block':'none';
        }

        return theModal;
    }
    //
    theModal.destroy = ()=>{
        theModal.remove();
    }
    //
    theModal.flush=()=>{
        // TODO sorun var, her seferde ici bosalmis getirtiyor, islem siralamasi hatali
        theModalContent.innerHTML='';
        return theModal;
    }


    return theModal;
}

