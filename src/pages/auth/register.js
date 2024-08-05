import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Link, Stack, TextField, Typography, Checkbox, FormControlLabel, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import { app, auth, storage } from 'src/firebase/config';
import { styled } from '@mui/material/styles';
import Autocomplete from "react-google-autocomplete";
import { type } from 'os';

const Input = styled('input')({
  display: 'none',
});

const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  const formik = useFormik({
    initialValues: {
      firstname: '',
      secondname: '',
      surname: '',
      profilePicture: '',
      phoneNumber: '',
      email: '',
      password: '',
      AcceptTermsAndConditions: '',
      locationOrAddress: '',
      birthday: '',
      IdNumber: '',
      IdDocumentLink: '',
      gender: '',
      status: 'Pending',
      submit: null
    },
    validationSchema: Yup.object({
      firstname: Yup.string().max(255).required('First Name is required'),
      secondname: Yup.string().max(255).required('Second Name is required'),
      surname: Yup.string().max(255).required('Surname is required'),
      profilePicture: Yup.string().max(255).required('Picture is required'),
      phoneNumber: Yup.string().max(255).required('Phone Number is required'),
      email: Yup.string().max(255).required('Email is required'),
      password: Yup.string().max(255).required('Password is required'),
      AcceptTermsAndConditions: Yup.string().required('Accept Terms and Conditions is required'),
      locationOrAddress: Yup.string().max(255).required('Location or Address is required'),
      birthday: Yup.string().max(255).required('Birthday is required'),
      IdNumber: Yup.string().max(255).required('Id Number is required'),
      IdDocumentLink: Yup.string().max(255).required('Id Document is required'),
      gender: Yup.string().max(255).required('Gender is required'),
      status: Yup.string().max(255).required('Status is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        const profilePictureFile = values.profilePicture;
        const idDocumentFile = values.IdDocumentLink;

        const profilePictureSnapshot = await storage.ref('images/' + profilePictureFile.name).put(profilePictureFile);
        const idDocumentSnapshot = await storage.ref('documents/' + idDocumentFile.name).put(idDocumentFile);

        const profilePictureUrl = await profilePictureSnapshot.ref.getDownloadURL();
        const IdDocumentUrl = await idDocumentSnapshot.ref.getDownloadURL();

        await auth.signUp(
          values.firstname,
          values.secondname,
          values.surname,
          profilePictureUrl,
          values.phoneNumber,
          values.email,
          values.password,
          values.AcceptTermsAndConditions,
          values.locationOrAddress,
          values.birthday,
          values.IdNumber,
          IdDocumentUrl,
          values.gender,
          values.status
        );

        router.push('/');
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  //console.log(formik.values);

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <Box
        sx={{
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Register As A Business Owner</Typography>
              <Typography color="text.secondary" variant="body2">
                Already have an account?&nbsp;
                <Link component={NextLink} href="/auth/login" underline="hover" variant="subtitle2">
                  Log in
                </Link>
              </Typography>
            </Stack>
            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                
                <label htmlFor="icon-button-file">
                  <Input 
                  accept="image/*" 
                  error={!!(formik.touched.profilePicture && formik.errors.profilePicture)}
                  helperText={formik.touched.profilePicture && formik.errors.profilePicture}
                  id="icon-button-file" 
                  type="file" onChange={(event) => {
                    formik.setFieldValue('profilePicture', event.target.files[0]);
                  }}
                  />
                  <Button
                variant="outlined"
                component="span"
                >
                  Upload Profile Picture
                </Button>
                </label>
                
                <TextField
                  error={!!(formik.touched.firstname && formik.errors.firstname)}
                  fullWidth
                  helperText={formik.touched.firstname && formik.errors.firstname}
                  label="First Name"
                  name="firstname"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.firstname}
                />
                <TextField
                  error={!!(formik.touched.secondname && formik.errors.secondname)}
                  fullWidth
                  helperText={formik.touched.secondname && formik.errors.secondname}
                  label="Second Name"
                  name="secondname"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.secondname}
                />
                <TextField
                  error={!!(formik.touched.surname && formik.errors.surname)}
                  fullWidth
                  helperText={formik.touched.surname && formik.errors.surname}
                  label="Surname"
                  name="surname"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.surname}
                />
              {/*   <TextField
                  error={!!(formik.touched.profilePicture && formik.errors.profilePicture)}
                  fullWidth
                  helperText={formik.touched.profilePicture && formik.errors.profilePicture}
                  
                  name="profilePicture"
                  onBlur={formik.handleBlur}
                  onChange={(event) => {
                    formik.setFieldValue('profilePicture', event.target.files[0]);
                  }}
                  type="file"
                /> */}
                <TextField
                  error={!!(formik.touched.phoneNumber && formik.errors.phoneNumber)}
                  fullWidth
                  helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                  label="Phone Number"
                  name="phoneNumber"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="tel"
                  value={formik.values.phoneNumber}
                />
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                />
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />

                <Autocomplete
                name="locationOrAddress"
                  apiKey={'AIzaSyBpALLpJ_BiVXtnq6XV06BRVWFN68nwADk'}
                  options={{
                    types: ["address"],
                    componentRestrictions: {country: 'za'}
                  }}
                  onPlaceSelected={(place) => {
                    
                    formik.handleChange
                  }}
                />

                {/* <TextField
                  error={!!(formik.touched.locationOrAddress && formik.errors.locationOrAddress)}
                  fullWidth
                  helperText={formik.touched.locationOrAddress && formik.errors.locationOrAddress}
                  label="Location or Address"
                  name="locationOrAddress"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.locationOrAddress}
                /> */}
                <TextField
                  error={!!(formik.touched.birthday && formik.errors.birthday)}
                  fullWidth
                  helperText={formik.touched.birthday && formik.errors.birthday}
                  label="Birthday"
                  name="birthday"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="date"
                  value={formik.values.birthday}
                />
                <TextField
                  error={!!(formik.touched.IdNumber && formik.errors.IdNumber)}
                  fullWidth
                  helperText={formik.touched.IdNumber && formik.errors.IdNumber}
                  label="ID Number"
                  name="IdNumber"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.IdNumber}
                />
                <TextField
                  label="Status"
                  name="status"
                  value={formik.values.status}
                  style={{ display: 'none' }}
                />

                <FormControl fullWidth>
                  <InputLabel id="gender">Gender</InputLabel>
                  <Select
                    labelId="gender"
                    id="gender"
                    value={formik.values.gender}
                    label="Gender"
                    onChange={(e)=>{
                      formik.handleChange
                      formik.setFieldValue('gender', e.target.value)
                    }}
                    renderValue={(selected)=> selected}
                  >
                    <MenuItem value={'male'}>Male</MenuItem>
                    <MenuItem value={'female'}>Female</MenuItem>
                    <MenuItem value={'other'}>Other</MenuItem>
                  </Select>
                </FormControl>
                {/* <TextField
                  error={!!(formik.touched.gender && formik.errors.gender)}
                  fullWidth
                  helperText={formik.touched.gender && formik.errors.gender}
                  label="Gender"
                  name="gender"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.gender}
                /> */}
                 <Input 
                  accept="application/pdf" 
                  error={!!(formik.touched.IdDocumentLink && formik.errors.IdDocumentLink)}
                  helperText={formik.touched.IdDocumentLink && formik.errors.IdDocumentLink}
                  id="IdDocumentLink" 
                  name="IdDocumentLink"
                  style={{ display: 'none' }}
                  type="file" 
                  onChange={(event) => {
                    formik.setFieldValue('IdDocumentLink', event.target.files[0]);
                  }}
                  />
                 <label htmlFor="IdDocumentLink">
                  <Button
                variant="outlined"
                component="span">
                  Upload ID
                </Button>
                </label>

            {/*     <TextField
                  error={!!(formik.touched.IdDocumentLink && formik.errors.IdDocumentLink)}
                  fullWidth
                  helperText={formik.touched.IdDocumentLink && formik.errors.IdDocumentLink}
                
                  name="IdDocumentLink"
                  onBlur={formik.handleBlur}
                  onChange={(event) => {
                    formik.setFieldValue('IdDocumentLink', event.target.files[0]);
                  }}
                  type="file"
                /> */}
                <FormControlLabel
                  error={!!(formik.touched.AcceptTermsAndConditions && formik.errors.AcceptTermsAndConditions)}
                  fullWidth
                  helperText={formik.touched.AcceptTermsAndConditions && formik.errors.AcceptTermsAndConditions}
                  control={
                    <Checkbox
                      checked={formik.values.AcceptTermsAndConditions === 'yes'}
                      onChange={(event) => {
                        formik.setFieldValue('AcceptTermsAndConditions', event.target.checked ? 'yes' : '');
                      }}
                    />
                  }
                  label="Accept Terms and Conditions"
                  name="AcceptTermsAndConditions"
                />
              </Stack>
              {formik.errors.submit && (
                <Typography
                  color="error"
                  sx={{ mt: 3 }}
                  variant="body2"
                >
                  {formik.errors.submit}
                </Typography>
              )}
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
              >
                Continue
              </Button>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default Page;