
import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import * as Yup from 'yup';
import Toggle from 'react-bootstrap-toggle';
import { Formik, Form, useFormik } from 'formik';
import { ButtonGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';



const useStyles = makeStyles(theme => ({
    root: {
        width: '90%',
    },
    button: {
        marginRight: theme.spacing(1),
        
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

const initialValues = {
    role: "",
    fullname: "",
    email: "",
    username: "",
    password: "",
    changepassword: "",
    acceptTerms: false,
};

function getSteps() {
    return ['select user role', 'Account Settings', 'Address Details'];
}

export default function Register() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [loading, setLoading] = React.useState(false);
    // const [userRole, setRole] = React.useState('Buyer');
    const steps = getSteps();
    const RegistrationSchema = Yup.object().shape({
        fullname: Yup.string()
            .min(3, "Minimum 3 symbols")
            .max(50, "Maximum 50 symbols")
            .required(
                "Required field"
            ),
        email: Yup.string()
            .email("Wrong email format")
            .min(3, "Minimum 3 symbols")
            .max(50, "Maximum 50 symbols")
            .required(
                "Required field"
            ),
        username: Yup.string()
            .min(3, "Minimum 3 symbols")
            .max(50, "Maximum 50 symbols")
            .required(
                "Required field"
            ),
        password: Yup.string()
            .min(3, "Minimum 3 symbols")
            .max(50, "Maximum 50 symbols")
            .required(
                "Required field"
            ),
        changepassword: Yup.string()
            .required(
                "Required field"
            )
            .when("password", {
                is: (val) => (val && val.length > 0 ? true : false),
                then: Yup.string().oneOf(
                    [Yup.ref("password")],
                    "Password and Confirm Password didn't match"
                ),
            }),
        acceptTerms: Yup.bool().required(
            "You must accept the terms and conditions"
        ),
    });

    const enableLoading = () => {
        setLoading(true);
    };

    const disableLoading = () => {
        setLoading(false);
    };

    const getInputClasses = (fieldname) => {
        if (formik.touched[fieldname] && formik.errors[fieldname]) {
            return "is-invalid";
        }

        if (formik.touched[fieldname] && !formik.errors[fieldname]) {
            return "is-valid";
        }

        return "";
    };
    const setRole = (role) => {
        initialValues.role = role;
    }
    const formik = useFormik({
        initialValues,
        validationSchema: RegistrationSchema,
        // onSubmit: (values, { setStatus, setSubmitting }) => {
        //     enableLoading();
        //     register(values.email, values.fullname, values.username, values.password)
        //         .then(({ data: { accessToken } }) => {
        //             props.register(accessToken);
        //             disableLoading();
        //         })
        //         .catch(() => {
        //             setSubmitting(false);
        //             setStatus(
        //                 intl.formatMessage({
        //                     id: "AUTH.VALIDATION.INVALID_LOGIN",
        //                 })
        //             );
        //             disableLoading();
        //         });
        // },
    });

    // function setUserRole() {

    //     return (
    //         <FormikStepper>
    //             <div>
    //                 <Toggle
    //                     onClick={setRole(userRole === 'Buyer' ? 'Maker' : 'Buyer')}
    //                     on={<h2>Buyer</h2>}
    //                     off={<h2>Maker</h2>}
    //                     size="xs"
    //                     offstyle="danger"
    //                     active={true}
    //                 />
    //             </div>
    //             <div>
    //                 <Label>First Name</Label>
    //                 <Input placeholder="First Name" />
    //                 <span className="form-text text-muted">Please enter your first name.</span>

    //                 <Label>Last Name</Label>
    //                 <Input placeholder="Last Name" />
    //                 <span className="form-text text-muted">Please enter your last name.</span>


    //             </div>
    //         </FormikStepper>
    //     )
    // }

    function getStepContent(step) {
        switch (step) {
            case 0:
                return (
                    <div className="pb-5">
                        {/*begin::Form Group*/}
                        <div className="form-group">
                            <label className="font-size-h6 font-weight-bolder text-dark" style={{textAlign: "center"}}>I am a</label>
                            <br/>
                            <ButtonGroup className="btn-group">
                                <Button className="btn btn-warning btn-icon" onClick={setRole("Buyer")}>Buyer</Button>
                                <Button className="btn btn-info btn-icon" onClick={setRole("Maker")}>Maker</Button>
                            </ButtonGroup>
                            <span className="form-text text-muted">Please enter your role here.</span>
                        </div>
                        {/*end::Form Group*/}
                    </div>
                );
            case 1:
                return (
                    <div className="pb-5">
                        {/*begin::Title*/}
                        {/*begin::Form Group*/}
                        <div className="form-group">
                            <label className="font-size-h6 font-weight-bolder text-dark">First Name</label>
                            <input type="text" className="form-control h-auto py-7 px-6 border-0 rounded-lg font-size-h6" name="fname" placeholder="First Name" defaultValue />
                            <span className="form-text text-muted">Please enter your first name.</span>
                        </div>
                        {/*end::Form Group*/}
                        {/*begin::Form Group*/}
                        <div className="form-group">
                            <label className="font-size-h6 font-weight-bolder text-dark">Last Name</label>
                            <input type="text" className="form-control h-auto py-7 px-6 border-0 rounded-lg font-size-h6" name="lname" placeholder="Last Name" defaultValue />
                            <span className="form-text text-muted">Please enter your last name.</span>
                        </div>
                        {/*end::Form Group*/}
                        {/*begin::Form Group*/}
                        <div className="form-group">
                            <label className="font-size-h6 font-weight-bolder text-dark">Phone</label>
                            <input type="tel" className="form-control h-auto py-7 px-6 border-0 rounded-lg font-size-h6" name="phone" placeholder="phone" defaultValue={+61412345678} />
                        </div>
                        {/*end::Form Group*/}
                        {/*begin::Form Group*/}
                        <div className="form-group">
                            <label className="font-size-h6 font-weight-bolder text-dark">Email</label>
                            <input type="email" className="form-control h-auto py-7 px-6 border-0 rounded-lg font-size-h6" name="email" placeholder="Email" defaultValue="john.wick@reeves.com" />
                            <span className="form-text text-muted">Please enter your email address.</span>
                        </div>
                        {/*end::Form Group*/}
                    </div>
                );
            case 2:
                return (
                    <div className="wizard-step" data-wizard-type="step">
                        <div className="wizard-wrapper">
                            <div className="wizard-icon">
                                <i className="wizard-check ki ki-check" />
                                <span className="wizard-number">3</span>
                            </div>
                            <div className="wizard-label">
                                <h3 className="wizard-title">Support Channels</h3>
                                <div className="wizard-desc">Add Your Support Agents</div>
                            </div>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="wizard-step" data-wizard-type="step">
                        <div className="wizard-wrapper">
                            <div className="wizard-icon">
                                <i className="wizard-check ki ki-check" />
                                <span className="wizard-number">5</span>
                            </div>
                            <div className="wizard-label">
                                <h3 className="wizard-title">Make Payment</h3>
                                <div className="wizard-desc">Use Credit or Debit Cards</div>
                            </div>
                        </div>
                    </div>
                )
            default:
                return 'Unknown step';
        }
    }
    function isStepOptional(step) {
        return step === 1;
    }

    function isStepSkipped(step) {
        return skipped.has(step);
    }

    function handleNext() {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep(prevActiveStep => prevActiveStep + 1);
        setSkipped(newSkipped);
    }

    function handleBack() {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    }

    function handleSkip() {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep(prevActiveStep => prevActiveStep + 1);
        setSkipped(prevSkipped => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    }

    function handleReset() {
        setActiveStep(0);
    }

    return (
        <div className="d-flex flex-column flex-root" style={{ display: "inline" }}>
            <div className="login login-5 wizard d-flex flex-column flex-lg-row flex-column-fluid wizard" id="kt_login" data-wizard-clickable="true">
                {/*begin::Aside*/}
                <div className="login-aside d-flex flex-column flex-row-auto">
                    {/*begin::Aside Top*/}
                    <div className="d-flex flex-column-auto flex-column pt-15 px-30">
                        {/*begin::Aside header*/}
                        <a href="/" className="login-logo py-6">
                            <img src={require("../../media/logos/logo-1.png")} className="max-h-70px" alt="" />
                        </a>
                        {/*end::Aside header*/}
                        {/*begin: Wizard Nav*/}
                        <div className="wizard-nav pt-5 pt-lg-15">
                            {/*begin::Wizard Steps*/}
                            <div className="wizard-steps">
                                <Stepper activeStep={activeStep} orientation="vertical">
                                    {steps.map((label, index) => {
                                        const stepProps = {};
                                        const labelProps = {};
                                        if (isStepOptional(index)) {
                                            labelProps.optional = <Typography variant="caption">Optional</Typography>;
                                        }
                                        if (isStepSkipped(index)) {
                                            stepProps.completed = false;
                                        }
                                        return (
                                            <Step key={label} {...stepProps}>
                                                <StepLabel {...labelProps}>
                                                    <h3>{label}</h3>
                                                </StepLabel>
                                            </Step>
                                        );
                                    })}
                                </Stepper>
                            </div>
                            {/*end::Wizard Steps*/}
                        </div>
                        {/*end: Wizard Nav*/}
                    </div>
                    <div className="aside-img-wizard d-flex flex-row-fluid bgi-no-repeat bgi-position-y-bottom bgi-position-x-center pt-2 pt-lg-5" style={{ backgroundPositionY: 'calc(100% + 3rem)', backgroundImage: `url(require(../../media/svg/illustrations/features.svg))` }} />
                    {/*end::Aside Bottom*/}
                </div>
                <div className="login-content flex-row-fluid d-flex flex-column p-10">
                    {/*begin::Wrapper*/}
                    <div className="d-flex flex-row-fluid flex-center">
                        {/*begin::Signin*/}
                        <div className="login-form login-form-signup">
                            {/*begin::Form*/}
                            <form className="form fv-plugins-bootstrap fv-plugins-framework" noValidate="novalidate" onSubmit={formik.handleSubmit}>
                                {/*begin: Wizard Step 1*/}
                                <div className="pb-5" data-wizard-type="step-content" data-wizard-state="current">
                                    <div className="pb-10 pb-lg-15">
                                        <h3 className="font-weight-bolder text-dark font-size-h2 font-size-h1-lg">Create Account</h3>
                                        <div className="text-muted font-weight-bold font-size-h4">Already have an Account ?
                                        <Link to="/login" className="text-primary font-weight-bolder">Sign In</Link>
                                        </div>
                                    </div>
                                    <div>
                                        {activeStep === steps.length ? (
                                            <div>
                                                <Typography className={classes.instructions}>
                                                    All steps completed - you&apos;re finished
                                                </Typography>
                                                <Button onClick={handleReset} className={classes.button}>
                                                    Reset
                                                </Button>
                                            </div>
                                        ) : (
                                                <div>
                                                    <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                                                    <div>
                                                        <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                                            Back
                                </Button>
                                                        {isStepOptional(activeStep) && (
                                                            <Button
                                                                variant="contained"
                                                                color="primary"
                                                                onClick={handleSkip}
                                                                className={classes.button}
                                                            >
                                                                Skip
                                                            </Button>
                                                        )}

                                                        <Button
                                                            className="btn btn-info"
                                                            variant="contained"
                                                            color="primary"
                                                            onClick={handleNext}
                                                        >
                                                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
