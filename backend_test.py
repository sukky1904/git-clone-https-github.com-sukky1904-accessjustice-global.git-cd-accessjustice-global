import requests
import sys
import json
from datetime import datetime
from typing import Optional, Dict, Any

class AccessJusticeAPITester:
    def __init__(self, base_url="https://ai-legal-test.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.token = None
        self.session_token = None
        self.user_id = None
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name: str, success: bool, details: str = ""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
        
        result = {
            "test_name": name,
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat()
        }
        self.test_results.append(result)
        
        status = "✅ PASSED" if success else "❌ FAILED"
        print(f"{status} | {name}")
        if details and not success:
            print(f"         {details}")

    def run_test(self, name: str, method: str, endpoint: str, expected_status: int, 
                 data: Optional[Dict] = None, headers: Optional[Dict] = None) -> tuple[bool, Dict]:
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}" if not endpoint.startswith('http') else endpoint
        
        # Set up headers
        request_headers = {'Content-Type': 'application/json'}
        if self.token:
            request_headers['Authorization'] = f'Bearer {self.token}'
        if headers:
            request_headers.update(headers)

        try:
            if method == 'GET':
                response = requests.get(url, headers=request_headers, timeout=30)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=request_headers, timeout=30)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=request_headers, timeout=30)
            elif method == 'DELETE':
                response = requests.delete(url, headers=request_headers, timeout=30)
            else:
                self.log_test(name, False, f"Unsupported method: {method}")
                return False, {}

            success = response.status_code == expected_status
            
            try:
                response_data = response.json()
            except:
                response_data = {"response_text": response.text[:200]}

            details = f"Expected {expected_status}, got {response.status_code}"
            if not success and response.status_code != expected_status:
                details += f" | Response: {json.dumps(response_data, indent=2)[:300]}"

            self.log_test(name, success, details if not success else "")
            return success, response_data

        except requests.exceptions.Timeout:
            self.log_test(name, False, "Request timeout (30s)")
            return False, {}
        except requests.exceptions.ConnectionError:
            self.log_test(name, False, "Connection error")
            return False, {}
        except Exception as e:
            self.log_test(name, False, f"Error: {str(e)}")
            return False, {}

    def test_basic_endpoints(self):
        """Test basic API endpoints"""
        print("\n🔍 Testing Basic Endpoints...")
        
        # Test root endpoint
        self.run_test("API Root", "GET", "", 200)
        
        # Test stats endpoint
        self.run_test("Stats Endpoint", "GET", "stats", 200)
        
        # Test templates endpoint (public)
        self.run_test("Templates Endpoint", "GET", "templates", 200)

    def test_auth_registration(self):
        """Test user registration"""
        print("\n👤 Testing User Registration...")
        
        timestamp = int(datetime.now().timestamp())
        test_user = {
            "name": f"Test User {timestamp}",
            "email": f"test.user.{timestamp}@example.com",
            "password": "TestPass123!",
            "role": "citizen"
        }
        
        success, response = self.run_test("User Registration", "POST", "auth/register", 200, test_user)
        
        if success and 'token' in response:
            self.token = response['token']
            self.user_id = response['user'].get('user_id')
            print(f"         Registered user: {test_user['email']}")
            return True
        return False

    def test_auth_login(self):
        """Test user login with existing user"""
        print("\n🔐 Testing User Login...")
        
        # First create a user for login test
        timestamp = int(datetime.now().timestamp()) + 1000
        test_user = {
            "name": f"Login Test User {timestamp}",
            "email": f"login.test.{timestamp}@example.com", 
            "password": "TestPass123!",
            "role": "citizen"
        }
        
        # Register user first
        reg_success, reg_response = self.run_test("User Registration for Login", "POST", "auth/register", 200, test_user)
        
        if not reg_success:
            return False
            
        # Test login
        login_data = {
            "email": test_user['email'],
            "password": test_user['password']
        }
        
        success, response = self.run_test("User Login", "POST", "auth/login", 200, login_data)
        
        if success and 'token' in response:
            self.token = response['token']
            self.user_id = response['user'].get('user_id')
            print(f"         Logged in user: {login_data['email']}")
        
        return success

    def test_protected_endpoints(self):
        """Test endpoints that require authentication"""
        print("\n🔒 Testing Protected Endpoints...")
        
        if not self.token:
            print("         No auth token available, skipping protected endpoint tests")
            return
        
        # Test /auth/me
        self.run_test("Get Current User", "GET", "auth/me", 200)
        
        # Test logout
        self.run_test("User Logout", "POST", "auth/logout", 200)

    def test_ai_chat(self):
        """Test AI chat functionality"""
        print("\n🤖 Testing AI Chat...")
        
        chat_data = {
            "message": "What are my rights as a tenant if my landlord wants to evict me?",
            "session_id": None,
            "topic": "housing"
        }
        
        success, response = self.run_test("AI Chat Request", "POST", "chat", 200, chat_data)
        
        if success:
            if 'response' in response and 'session_id' in response:
                print(f"         AI Response received: {len(response['response'])} characters")
                
                # Test follow-up message in same session
                follow_up_data = {
                    "message": "What documents do I need?",
                    "session_id": response['session_id'],
                    "topic": "housing"
                }
                
                self.run_test("AI Chat Follow-up", "POST", "chat", 200, follow_up_data)
            else:
                self.log_test("AI Chat Response Format", False, "Missing 'response' or 'session_id' in response")

    def test_legal_templates(self):
        """Test legal templates functionality"""
        print("\n📄 Testing Legal Templates...")
        
        # Get all templates
        success, response = self.run_test("Get All Templates", "GET", "templates", 200)
        
        if success and 'templates' in response:
            templates = response['templates']
            print(f"         Found {len(templates)} templates")
            
            if len(templates) > 0:
                # Test getting specific template
                first_template = templates[0]
                template_id = first_template.get('template_id')
                if template_id:
                    self.run_test("Get Specific Template", "GET", f"templates/{template_id}", 200)
        
        # Test category filtering
        self.run_test("Filter Templates by Category", "GET", "templates?category=Housing", 200)

    def test_contact_submission(self):
        """Test contact form submission"""
        print("\n📧 Testing Contact Submission...")
        
        timestamp = int(datetime.now().timestamp())
        contact_data = {
            "name": f"Test Contact {timestamp}",
            "email": f"contact.test.{timestamp}@example.com",
            "organization": "Test Organization",
            "message": "This is a test contact message for API testing.",
            "submission_type": "general"
        }
        
        success, response = self.run_test("Contact Form Submission", "POST", "contact", 200, contact_data)
        
        if success and 'submission_id' in response:
            print(f"         Contact submitted with ID: {response['submission_id']}")

    def test_justice_wallet(self):
        """Test Justice Wallet application"""
        print("\n💰 Testing Justice Wallet...")
        
        timestamp = int(datetime.now().timestamp())
        wallet_data = {
            "name": f"Test Applicant {timestamp}",
            "email": f"wallet.test.{timestamp}@example.com",
            "case_description": "I need legal help but cannot afford lawyer fees. This is a test application.",
            "income_level": "low"
        }
        
        success, response = self.run_test("Justice Wallet Application", "POST", "justice-wallet/apply", 200, wallet_data)
        
        if success and 'application_id' in response:
            print(f"         Wallet application submitted with ID: {response['application_id']}")

    def test_lawyer_endpoints(self):
        """Test lawyer-related endpoints"""
        print("\n⚖️ Testing Lawyer Endpoints...")
        
        # Test getting lawyers list
        self.run_test("Get Lawyers List", "GET", "lawyers", 200)
        
        # Test lawyer registration (requires auth)
        if self.token:
            lawyer_data = {
                "bar_number": "BAR123456789",
                "practice_areas": ["Housing", "Employment"],
                "bio": "Experienced lawyer specializing in tenant rights and employment law.",
                "phone": "+1234567890",
                "location": "Lagos, Nigeria"
            }
            
            self.run_test("Lawyer Registration", "POST", "lawyers/register", 200, lawyer_data)

    def run_all_tests(self):
        """Run all tests"""
        print("🚀 Starting AccessJustice.Global API Testing...")
        print(f"Backend URL: {self.base_url}")
        
        # Test basic endpoints
        self.test_basic_endpoints()
        
        # Test authentication
        auth_success = self.test_auth_registration()
        if not auth_success:
            # Try login if registration failed
            self.test_auth_login()
        
        # Test protected endpoints
        self.test_protected_endpoints()
        
        # Test AI chat
        self.test_ai_chat()
        
        # Test templates
        self.test_legal_templates()
        
        # Test contact
        self.test_contact_submission()
        
        # Test justice wallet
        self.test_justice_wallet()
        
        # Test lawyer endpoints
        self.test_lawyer_endpoints()
        
        # Print summary
        print(f"\n📊 Test Summary:")
        print(f"Tests run: {self.tests_run}")
        print(f"Tests passed: {self.tests_passed}")
        print(f"Tests failed: {self.tests_run - self.tests_passed}")
        print(f"Success rate: {(self.tests_passed/self.tests_run*100):.1f}%" if self.tests_run > 0 else "No tests run")
        
        # Check for critical failures
        failed_tests = [test for test in self.test_results if not test['success']]
        if failed_tests:
            print(f"\n❌ Failed Tests:")
            for test in failed_tests[:5]:  # Show first 5 failures
                print(f"   • {test['test_name']}: {test['details']}")
        
        return self.tests_passed, self.tests_run, self.test_results

def main():
    tester = AccessJusticeAPITester()
    
    try:
        passed, total, results = tester.run_all_tests()
        
        # Return appropriate exit code
        if passed == total:
            print("\n✅ All tests passed!")
            return 0
        elif passed >= total * 0.8:  # 80% pass rate
            print(f"\n⚠️  Most tests passed ({passed}/{total})")
            return 0
        else:
            print(f"\n❌ Many tests failed ({passed}/{total})")
            return 1
            
    except KeyboardInterrupt:
        print("\n\n⏹️  Testing interrupted by user")
        return 130
    except Exception as e:
        print(f"\n💥 Testing failed with error: {str(e)}")
        return 1

if __name__ == "__main__":
    sys.exit(main())