
# Reactive-Form-ng8
Reactive Form is an approach in angular-8 to build forms.
FormGroup ,FormControl and FormArray is Key building blocks of Reactive Forms.
it has 2 methods ,by using 
#1. FormGroup, FormControl and FormArray
#2. FormBuilder (in form of API,we will inject in constructor)


#Important :
FormGroup, FormControl and FormArray are all inherited from AbstractControl(abstract class).


# FormGroup :
    it is Collection of Form Controls.
    
# FormControl 
     Form Control as name suggest, it is control in the form like firstName ,lastName etc.
     To get FormControl value in ts file,there are 2 ways.
     # 1. formGroup.control.firstName.value.
     # 2. formGroup.get('firstName').value .

# FormBuilder 
FormBuilder is also use to create reactive Forms,it reduce the amount of code in component.
              Form builder contains 2 methods
              1. Control()
              2. group()
              3. array() 
              
  # FormArray
  contains 
  form Control
  form group and nested Form arrays.
  
  # Firebase 
   I have also added Firebase User Registrationa and user login.
   
   # NGXS
    A state mangement stuff is added in project,you can view it in ngxs tab in project.
    
  #Docker
  I also added docker support.so you can pull image from dockerhub.
  link is  mohsinazam/ng8
   
 All above stuff is in details in the project,so look and implement.
 
 Thanks
     
     
    
