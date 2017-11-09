var app = new Vue({
  el: '#app',
  data: {
    notes:[],
    newnote:'',
  },
  methods:{

    // (function(d, s, id) {
    //   var js, fjs = d.getElementsByTagName(s)[0];
    //   if (d.getElementById(id)) return;
    //   js = d.createElement(s); js.id = id;
    //   js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.10&appId=122577161755775';
    //   fjs.parentNode.insertBefore(js, fjs);
    // }(document, 'script', 'facebook-jssdk'));
    // ,
    //
    // checkLogin(){
    //   this.notes=[]
    //   this.newnote=''
    //   localStorage.removeItem("tokenjwt")
    //
    //   FB.getLoginStatus(response=>{
    //     console.log(response.authResponse.accessToken);
    //     if(response.authResponse){
    //       axios.post(`http://localhost:3000/users/login`, { accesstoken: response.authResponse.accessToken })
    //       .then(response=>{
    //         localStorage.setItem("tokenjwt", response.data.tokenjwt)
    //         // window.location.reload();
    //       })
    //     }else{
    //       // window.location.reload();
    //     }
    //   })
    // }


    getAll(){
      const config={
        headers:{'tokenjwt': localStorage.getItem("tokenjwt")}
      }
      axios.get(`http://localhost:3000/todo`,config )
      .then(response=>{
        this.notes=response.data.notes
      }).catch(err=>{
        console.log(err);
      })
    }
    ,

    addNote(){
      const data={header:this.newnote}
      const config={
        headers:{'tokenjwt': localStorage.getItem("tokenjwt")},
      }
      axios.post(`http://localhost:3000/todo/new`,data,config )
      .then(response=>{
        this.notes.push(response.data.newNote)
        this.newnote=''
        console.log(response);
      }).catch(err=>{
        console.log(err);
      })

    }
    ,
    addTask(index){
      const config={
        headers:{'tokenjwt': localStorage.getItem("tokenjwt")},
      }
      const data={}
      if(this.notes[index].newtask.indexOf(':')>0){
        data.task=this.notes[index].newtask.split(':')[0].trim()
        data.detail=this.notes[index].newtask.split(':')[1].trim()
      }else{
        data.task=this.notes[index].newtask
      }

      axios.put(`http://localhost:3000/todo/add/${this.notes[index]._id}` , data,config)
      .then(response=>{
        this.notes[index].list.push(response.data.newTask)
        this.notes[index].newtask=''
      }).catch(err=>{
        console.log(err);
      })
    }
    ,
    deleteNote(index){
      const config={
        headers:{'tokenjwt': localStorage.getItem("tokenjwt")},
      }

      axios.delete(`http://localhost:3000/todo/${this.notes[index]._id}`,config )
      .then(result=>{
        this.notes.splice(index,1)
      }).catch(err=>{
        console.log(err);
      })
    }
    ,
    toggletask(inote,ilist){
      const data={
        taskid:this.notes[inote].list[ilist]._id,
        complete:!this.notes[inote].list[ilist].completed
      }
      const config={
        headers:{'tokenjwt': localStorage.getItem("tokenjwt")},
      }
      axios.put(`http://localhost:3000/todo/task/${this.notes[inote]._id}` , data,config)
      .then(result=>{
        console.log(result);
        this.notes[inote].list[ilist].completed=!this.notes[inote].list[ilist].completed
      }).catch(err=>{
        console.log(err);
      })
    }

  }
,
  created(){

    this.getAll()
  }




})
