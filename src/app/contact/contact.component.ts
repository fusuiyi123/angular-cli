import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType} from '../shared/feedback';
import { FeedbackService } from '../services/feedback.service';
import { flyInOut, expand } from '../animations/app.animations';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '@flyInOut': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  contactErrMess: string;
  submitting = false;
  submitted = false;
  form = true;
  
  contactType = ContactType;
  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages = {
    'firstname': {
      'required': 'First Name is required.',
      'minlength': 'First Name must be at least 2 characters long.',
      'maxlength': 'First Name cannot be more than 25 characters long.'
    },
    'lastname': {
      'required': 'Last Name is required.',
      'minlength': 'Last Name must be at least 2 characters long.',
      'maxlength': 'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required': 'Tel. Number is required.',
      'pattern': 'Tel. Number must contain only numbers.'
    },
    'email': {
      'required': 'Email is required.',
      'email': 'Email not in valid format.'
    }
  };

  constructor(private fb: FormBuilder, 
    private feedbackservice: FeedbackService,
    @Inject('BaseURL') private BaseURL) { // <--- Inject FormBuilder
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: ['',[Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set form validation messages
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    /*
    if (this.submitted) {
      this.submitted = false;
      this.formErrors = {
        'firstname': '',
        'lastname': '',
        'telnum': '',
        'email': ''
      };
      return;
    }*/
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  onSubmit() {
    this.submitting = true;
    this.form = false;

    // show the submission for 5 seconds.
    this.feedbackservice.submitFeedback(this.feedbackForm.value)
      .subscribe(feedback => {
        this.feedback = feedback;
        console.log(this.feedback);
        this.submitting = false;
        setTimeout(() => {
          this.form = true;
          this.feedback = null;
          // this.submitted = true;
        }, 5000)}, errmess => { this.feedback = null; this.contactErrMess = errmess});
    
    

    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });

  }

}
