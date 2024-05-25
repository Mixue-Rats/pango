import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    MDBProgress,
    MDBProgressBar,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem
  } from 'mdb-react-ui-kit';

  import { useAuthContext } from '../hooks/useAuthContext';
import { time } from 'console';
import withAuth from '../components/Auth';

  


const UserProfile = () => {
  const { user } = useAuthContext();
  setTimeout(() => {}, 3000);


    return (
        <section style={{ backgroundColor: '#eee' }}>
          <MDBContainer className="py-5">
            <MDBRow>
              <MDBCol>
                <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                  <MDBBreadcrumbItem>
                    <a href='#'>Home</a>
                  </MDBBreadcrumbItem>
                  <MDBBreadcrumbItem>
                    <a href="#">User</a>
                  </MDBBreadcrumbItem>
                  <MDBBreadcrumbItem active>profile</MDBBreadcrumbItem>
                </MDBBreadcrumb>
              </MDBCol>
            </MDBRow>
    
            <MDBRow>
              <MDBCol lg="4">
                <MDBCard className="mb-4">
                  <MDBCardBody className="text-center">
                    <MDBCardImage
                      src="https://commons.wikimedia.org/wiki/File:Singapore_Red_Cross.jpg#/media/File:Singapore_Red_Cross.jpg"
                      alt=""
                      className="rounded-circle"
                      style={{ width: '150px' }}
                      fluid />
                    <p className="text-muted mb-1">Student</p>
                    <p className="text-muted mb-4">Singapore, Singapore</p>
                    <div className="d-flex justify-content-center mb-2">
                      {/* <MDBBtn>Follow</MDBBtn>
                      <MDBBtn outline className="ms-1">Message</MDBBtn> */}
                    </div>
                  </MDBCardBody>
                </MDBCard>
    
                {/* <MDBCard className="mb-4 mb-lg-0">
                  <MDBCardBody className="p-0">
                    <MDBListGroup flush className="rounded-3">
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon fas icon="globe fa-lg text-warning" />
                        <MDBCardText>shuheng.com</MDBCardText>
                      </MDBListGroupItem>
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon fab icon="twitter fa-lg" style={{ color: '#55acee' }} />
                        <MDBCardText>@twitter</MDBCardText>
                      </MDBListGroupItem>
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon fab icon="instagram fa-lg" style={{ color: '#ac2bac' }} />
                        <MDBCardText>@instagram</MDBCardText>
                      </MDBListGroupItem>
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon fab icon="facebook fa-lg" style={{ color: '#3b5998' }} />
                        <MDBCardText>@facebook</MDBCardText>
                      </MDBListGroupItem>
                    </MDBListGroup>
                  </MDBCardBody>
                </MDBCard> */}
              </MDBCol>
              <MDBCol lg="8">
                <MDBCard className="mb-4">
                  <MDBCardBody>
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Full Name</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        { user ? (
                          <MDBCardText className="text-muted">{user.user.fullname}</MDBCardText>
                        ) : (
                          <MDBCardText className="text-muted">Name not found</MDBCardText>
                        )}
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Email</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                      { user ? (
                          <MDBCardText className="text-muted">{user.user.email}</MDBCardText>
                        ) : (
                          <MDBCardText className="text-muted">Email not found</MDBCardText>
                        )}
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Contact</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">(65) 98765432</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    {/* <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Mobile</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">(098) 765-4321</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr /> */}
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Address</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">Singapore, Singapore</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
    
                {/* <MDBRow>
                  <MDBCol md="6">
                    <MDBCard className="mb-4 mb-md-0">
                      <MDBCardBody>
                        <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">Projects</span> Volunteering assignment</MDBCardText>
                        <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Volunteering 1</MDBCardText>
                        <MDBProgress className="rounded">
                          <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                        </MDBProgress>
    
                        <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Volunteering 2</MDBCardText>
                        <MDBProgress className="rounded">
                          <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                        </MDBProgress>
    
                        <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Volunteering 3</MDBCardText>
                        <MDBProgress className="rounded">
                          <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                        </MDBProgress>
    
                        <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Volunteering 4</MDBCardText>
                        <MDBProgress className="rounded">
                          <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                        </MDBProgress>
    
                        <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Volunteering 5</MDBCardText>
                        <MDBProgress className="rounded">
                          <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                        </MDBProgress>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
    
    
                </MDBRow> */}
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      );
    };

export default withAuth(UserProfile);