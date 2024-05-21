import PasswordReset from "@/components/PasswordResetForm";
import { Suspense } from "react";
function ResetPassword() {
  return (
    <Suspense>
      <PasswordReset />
    </Suspense>
  );
}
export default ResetPassword;
