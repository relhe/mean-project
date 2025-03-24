import { NgIf, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
    FormGroup,
    FormBuilder,
    Validators,
    ReactiveFormsModule,
    FormControl,
    AbstractControl,
} from '@angular/forms';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/httpCommunication/user/user.service';
import zxcvbn from 'zxcvbn';

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [ReactiveFormsModule, NgIf, NgClass],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
    users: User[] = [];
    signupForm: FormGroup;
    passwordStrength: number = 0;
    feedback: string = '';

    constructor(
        private readonly fb: FormBuilder,
        private readonly userService: UserService
    ) {
        this.signupForm = new FormGroup(
            {
                firstName: new FormControl('', Validators.required),
                lastName: new FormControl('', Validators.required),
                gender: new FormControl('', Validators.required),
                birthday: new FormControl('', Validators.required),
                email: new FormControl('', [
                    Validators.required,
                    Validators.email,
                ]),
                phone: new FormControl('', Validators.required),
                password: new FormControl('', [
                    Validators.required,
                    Validators.minLength(6),
                ]),
                confirmPassword: new FormControl('', Validators.required),
            },
            {
                validators: this.passwordsMatch.bind(this),
            }
        );
    }

    ngOnInit(): void {
        this.userService.getUsers().subscribe((users: User[]) => {
            console.log(users);
            this.users = users;
        });
    }

    get f() {
        return this.signupForm.controls;
    }

    passwordsMatch(control: AbstractControl) {
        const password = control.get('password')?.value;
        const confirm = control.get('confirmPassword')?.value;
        return password === confirm ? null : { mismatch: true };
    }

    onPasswordInput(): void {
        const password = this.signupForm.get('password')?.value;
        if (password) {
            const result = zxcvbn(password);
            this.passwordStrength = result.score;
            this.feedback =
                result.feedback.warning || result.feedback.suggestions[0] || '';
        } else {
            this.passwordStrength = 0;
            this.feedback = '';
        }
    }

    onSubmit(): void {
        if (this.signupForm.valid) {
            const newUser: User = {
                firstName: this.signupForm.value.firstName,
                lastName: this.signupForm.value.lastName,
                gender: this.signupForm.value.gender,
                birthday: this.signupForm.value.birthday,
                email: this.signupForm.value.email,
                phone: this.signupForm.value.phone,
                password: this.signupForm.value.password,
            };

            this.userService.createUser(newUser).subscribe(() => {
                this.users.push(newUser);
                this.signupForm.reset();
                this.passwordStrength = 0;
                this.feedback = '';
            });
        } else {
            this.signupForm.markAllAsTouched();
        }
    }
}
