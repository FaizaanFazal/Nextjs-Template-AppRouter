'use client';

export default function SignInWithGithub() {
  const handleLogin = () => {
    console.log("React: asking parent for LOGIN_WITH_GITHUB");
    window.parent.postMessage(
      { type: "LOGIN_WITH_GITHUB" },
      "*" 
    );
  };

  return (
    <div style={{ padding: 16, textAlign: 'center' }}>
      <h1>Please sign in</h1>
      <button
        onClick={handleLogin}
        style={{ marginTop: 12, padding: '8px 16px', fontSize: 16 }}
      >
        Sign in with GitHub
      </button>
    </div>
  );
}
