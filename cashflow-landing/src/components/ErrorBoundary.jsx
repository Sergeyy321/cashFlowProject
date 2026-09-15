import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center mb-6 text-2xl">
            ⚠️
          </div>
          <h1 className="text-2xl sm:text-3xl font-black mb-3">
            Щось пішло не так / Coś poszło nie tak
          </h1>
          <p className="text-zinc-400 max-w-md mb-8 text-sm sm:text-base leading-relaxed">
            Виникла тимчасова помилка інтерфейсу. Будь ласка, оновіть сторінку.
          </p>
          <button
            type="button"
            onClick={this.handleReload}
            className="px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold rounded-xl transition-all shadow-lg cursor-pointer text-sm"
          >
            Оновити сторінку / Odśwież stronę
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
