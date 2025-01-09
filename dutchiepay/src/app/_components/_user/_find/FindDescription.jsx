export default function FindDescription({ tab }) {
  return (
    <>
      {tab === '아이디(이메일) 찾기' ? (
        <p>
          가입 시 등록한 <strong>휴대폰 번호</strong>로 인증하시면
          <br />
          이메일 주소의 <strong>일부</strong>를 알려드립니다.
        </p>
      ) : (
        <p>
          가입하신 <strong>이메일 주소</strong>와 <strong>휴대폰 번호</strong>
          로 인증해주시면
          <br />
          비밀번호를 <strong>재설정</strong> 하실 수 있습니다.
        </p>
      )}
      <small className="text-red--500">
        ※ 소셜로그인(카카오, 네이버)로 가입한 계정은 이용이 불가능합니다.
      </small>
    </>
  );
}
