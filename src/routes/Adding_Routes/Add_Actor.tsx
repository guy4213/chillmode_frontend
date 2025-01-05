import React from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/InputField";

import { Dialogs } from "../../ui/dialogs";
import { useForm } from "react-hook-form";
import { ActorService } from "../../services/actor-service";

export const Add_Actor = () => {
  const nav = useNavigate();
  // Separate useForm for each form
  const { register: registerActor, handleSubmit: handleSubmitActor, formState: { errors: errorsActor } } = useForm({
      mode: "onChange",
  });
  const { register: registerActors, handleSubmit: handleSubmitActors, formState: { errors: errorsActors } } = useForm({
      mode: "onChange",
  });
  const { register: updateActor, handleSubmit: handleUpdateActor, formState: { errors: errorsUpdateActor } } = useForm({
    mode: "onChange",
});
const { register: deleteActor, handleSubmit: handleDeleteActor, formState: { errors: errorsDeleteActor } } = useForm({
    mode: "onChange",
});
  const onSubmit = async (data: any) => {
      try {
          console.log(data);
          const res = await ActorService.addActor(data);
          await Dialogs.success("Actor has been added!");
          console.log(res);
      } catch (e) {
          console.log(e);
          Dialogs.error(e);
      }
  };

  const onSubmitActors = async (data: any) => {
      try {
          console.log(data);
          const res = await ActorService.addActorsToASeries(data);
          await Dialogs.success("Actors have been added!");
          console.log(res);
      } catch (e) {
          console.log(e);
          Dialogs.error(e);
      }
  };
  const onUpdateActor = async (data: any) => {
    try {
        console.log(data);
        const res = await ActorService.updateActor(data);
        await Dialogs.success("Actor has been updated!");
        console.log(res);
    } catch (e) {
        console.log(e);
        Dialogs.error(e);
    }
};
const onDeleteActor= async (data: any) => {
    try {
        console.log(data);
        const res = await ActorService.deleteActor(data);
        console.log("response is :"+ JSON.stringify(res))
        console.log("response is :"+ res.deleted)
        if(res.deleted==true){ await Dialogs.success(`Actor ${data.id} has been DELETED`);}
         else{await Dialogs.error(`Actor ${data.id} does not exist.`);}
       
    } catch (e) {
        console.log(e);
        Dialogs.error(e);
    }
};
  return (
      <div className="signIn">
          <h1>Add Actor</h1>
          <form onSubmit={handleSubmitActor(onSubmit)} noValidate >
            
              <div className="formItem">
                  <InputField register={registerActor} errors={errorsActor} name="actorName" type='text'  minLength={2} maxLength={30} required={true}/>
              </div>
              <div className="formItem">
                  <InputField register={registerActor} errors={errorsActor} name="country" type='text'   minLength={2} maxLength={30}  required={true}/>
              </div> 
              <div className="formItem">
                  <InputField register={registerActor} errors={errorsActor} name="city" type='text'   minLength={2} maxLength={30} required={true}/>
              </div> 
              <div className="formItem">
                  <InputField register={registerActor}
                   errors={errorsActor}
                    name="role"
                     type='text'
                     minLength={4}
                     maxLength={9} 
                    pattern={{
                      value: /^(main|secondary)$/,
                      message:
                        "2 possible answers- main Or secondary",
                    }}
                    required={true}
                     />
              </div>  
              <button type="submit" className='signInButton'>Add New Actor</button>
          </form>



          <h1>Add Actors to a series.</h1>
          <form onSubmit={handleSubmitActors(onSubmitActors)} noValidate>
              <div className="formItem">
                  <InputField register={registerActors} errors={errorsActors} name="seriesId" type='text' minLength={1} required={true}/>
              </div>
              <div className="formItem">
                  <InputField register={registerActors} errors={errorsActors} name="actorNames" type='text'  minLength={2}  required={true}/>
              </div>
              <button type="submit" className='signInButton'>Add Actors to Series</button>
          </form>



          <h1>Update Actor</h1>
          <form onSubmit={handleUpdateActor(onUpdateActor)} noValidate>
          <div className="formItem">
                  <InputField register={updateActor} errors={errorsUpdateActor} name="id" type='text'  minLength={1} required={true}  />
              </div>
              <div className="formItem">
                  <InputField register={updateActor} errors={errorsUpdateActor} name="actorName" type='text' minLength={2} maxLength={30} required={true}  />
              </div>
              <div className="formItem">
                  <InputField register={updateActor} errors={errorsUpdateActor} name="country" type='text' minLength={2} maxLength={30} required={true} />
              </div> 
              <div className="formItem">
                  <InputField register={updateActor} errors={errorsUpdateActor} name="city" type='text'  minLength={2} maxLength={30} required={true} />
              </div> 
              <div className="formItem">
             
                  <InputField register={updateActor}
                   
                   errors={errorsUpdateActor}
                    name="role"
                     type='text' 
                     
                     minLength={4}
                     maxLength={9} 
                    pattern={{
                      value: /^(main|secondary)$/,
                      message:
                        "2 possible answers- main Or secondary",
                    }}
                    required={true}
                     />
              </div>  
              <button type="submit" className='signInButton'>Update Actor</button>
          </form>


          <h1>Delete Actor By Id.</h1>
          <form onSubmit={handleDeleteActor(onDeleteActor)} noValidate>
              <div className="formItem">
                  <InputField register={deleteActor} errors={errorsDeleteActor} name="id" type='text' minLength={1} required={true}/>
              </div>
              
              <button type="submit" className='signInButton'>delete Actor</button>
          </form>



          <button className='signInButton' onClick={() => nav("/Adding_Screen")}>Return</button>
      </div>
  );
}
