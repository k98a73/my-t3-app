import type { InferGetServerSidePropsType } from "next";
import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";

export default function Signin({
  // ここでprovidersの型を定義
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <div className="min-h-screen bg-olive-one p-0 selection:bg-green-two md:px-8 md:py-24">
        <div className="flex flex-col items-center space-y-20 pt-40">
          <Image
            src="/images/github-icon.png"
            width={170}
            height={170}
            alt="github-icon"
          />
          <div className="text-center">
            <div className="mx-auto max-w-3xl">
              <div className="flex justify-center"></div>
              {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                  <button
                    className="inline-flex w-full cursor-pointer items-center justify-center rounded-md p-4 text-xl font-bold hover:text-green-five"
                    onClick={() =>
                      void signIn(provider.id, {
                        callbackUrl: "/",
                      })
                    }
                  >
                    Sign in width {provider.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  // ここで、認証の方法（providers）を取得。複数の認証方法を取得可能。
  // 1つも認証方法が取得できなかった場合、providersは空配列
  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
